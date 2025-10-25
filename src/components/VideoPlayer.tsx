import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Maximize } from "lucide-react";

const VideoPlayer = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-black">
        {/* Placeholder video area */}
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
          <Play className="h-24 w-24 text-white opacity-50" />
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2">
            <div className="h-1 rounded-full bg-white/20">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                <Play className="h-4 w-4" />
              </Button>
              <span className="font-mono text-sm text-white">0:32 / 4:05</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Markers */}
      <div className="border-t border-border bg-muted/50 p-3">
        <div className="flex gap-2 overflow-x-auto">
          <div className="flex h-2 flex-1 gap-px rounded-full bg-background">
            <div className="w-1/12 rounded-l-full bg-destructive" />
            <div className="w-2/12 bg-muted" />
            <div className="w-1/12 bg-yellow-500" />
            <div className="w-3/12 bg-muted" />
            <div className="w-1/12 bg-destructive" />
            <div className="w-4/12 rounded-r-full bg-muted" />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Timeline showing critical (red), moderate (yellow), and minor issues
        </p>
      </div>
    </Card>
  );
};

export default VideoPlayer;
