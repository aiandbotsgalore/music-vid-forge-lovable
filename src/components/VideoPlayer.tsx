import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
  videoUrl?: string;
  onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer = ({ videoUrl, onTimeUpdate }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = value[0];
    video.volume = newVolume / 100;
    setVolume(newVolume);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden bg-black">
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-contain"
            onClick={togglePlay}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-20 w-20 text-white/50" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-border bg-card p-4">
        {/* Timeline */}
        <div className="mb-4">
          <Slider 
            value={[currentTime]} 
            max={duration || 100} 
            step={0.1} 
            onValueChange={handleSeek}
            className="cursor-pointer" 
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" onClick={togglePlay} disabled={!videoUrl}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="flex flex-1 items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider 
              value={[volume]} 
              max={100} 
              step={1} 
              onValueChange={handleVolumeChange}
              className="w-24" 
            />
          </div>
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => videoRef.current?.requestFullscreen()}
            disabled={!videoUrl}
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;
