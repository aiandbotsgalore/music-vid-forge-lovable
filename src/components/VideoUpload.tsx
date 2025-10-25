import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Film, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface VideoUploadProps {
  onVideoUploaded: (videoData: any) => void;
}

const VideoUpload = ({ onVideoUploaded }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload MP4, MOV, or AVI files.");
      return;
    }

    // Validate file size (max 500MB for demo)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 500MB.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadedFile(file);
          toast.success("Video uploaded successfully!");
          onVideoUploaded({ name: file.name, size: file.size, type: file.type });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }, [onVideoUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi']
    },
    maxFiles: 1,
    disabled: uploading || !!uploadedFile
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all ${
          isDragActive
            ? "border-primary bg-primary/5"
            : uploadedFile
            ? "border-accent bg-accent/5"
            : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
        } ${uploading || uploadedFile ? "cursor-default" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex min-h-[300px] flex-col items-center justify-center p-12">
          {uploadedFile ? (
            <>
              <CheckCircle2 className="mb-4 h-16 w-16 text-accent" />
              <h3 className="mb-2 text-xl font-semibold">{uploadedFile.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </>
          ) : uploading ? (
            <>
              <Film className="mb-4 h-16 w-16 animate-pulse text-primary" />
              <h3 className="mb-4 text-xl font-semibold">Uploading video...</h3>
              <div className="w-full max-w-xs">
                <Progress value={uploadProgress} className="h-2" />
                <p className="mt-2 text-center text-sm text-muted-foreground">{uploadProgress}%</p>
              </div>
            </>
          ) : (
            <>
              <Upload className="mb-4 h-16 w-16 text-muted-foreground transition-colors group-hover:text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                {isDragActive ? "Drop your video here" : "Upload Music Video"}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Drag and drop or click to browse
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-md bg-muted px-2 py-1">MP4</span>
                <span className="rounded-md bg-muted px-2 py-1">MOV</span>
                <span className="rounded-md bg-muted px-2 py-1">AVI</span>
                <span className="rounded-md bg-muted px-2 py-1">Max 500MB</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
