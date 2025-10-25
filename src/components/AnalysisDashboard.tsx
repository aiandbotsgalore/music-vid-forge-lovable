import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Play, AlertCircle, CheckCircle, Info, Image as ImageIcon } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import CritiquePanel from "@/components/CritiquePanel";

interface AnalysisDashboardProps {
  data: any;
  videoUrl: string;
}

const AnalysisDashboard = ({ data, videoUrl }: AnalysisDashboardProps) => {
  const [selectedCritique, setSelectedCritique] = useState(data.critiques[0]);

  const criticalCount = data.critiques.filter((c: any) => c.severity === "critical").length;
  const moderateCount = data.critiques.filter((c: any) => c.severity === "moderate").length;
  const minorCount = data.critiques.filter((c: any) => c.severity === "minor").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{data.videoTitle}</h1>
              <p className="text-sm text-muted-foreground">
                {Math.floor(data.duration / 60)}:{(data.duration % 60).toString().padStart(2, '0')} • {data.scenes} scenes detected
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              <Button className="gap-2 shadow-glow">
                <ImageIcon className="h-4 w-4" />
                Generate Storyboards
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{criticalCount}</p>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                </div>
              </div>
            </Card>
            <Card className="border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="flex items-center gap-3">
                <Info className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{moderateCount}</p>
                  <p className="text-sm text-muted-foreground">Moderate Issues</p>
                </div>
              </div>
            </Card>
            <Card className="border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{minorCount}</p>
                  <p className="text-sm text-muted-foreground">Minor Issues</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer videoUrl={videoUrl} />
          </div>

          {/* Critique List */}
          <div>
            <Card className="overflow-hidden">
              <div className="border-b border-border bg-muted/50 p-4">
                <h2 className="font-semibold">Timeline Critiques</h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {data.critiques.map((critique: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCritique(critique)}
                    className={`w-full border-b border-border p-4 text-left transition-colors hover:bg-muted/50 ${
                      selectedCritique === critique ? "bg-primary/10" : ""
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className="font-mono text-sm text-accent">{critique.timestamp}</span>
                      <Badge
                        variant={critique.severity === "critical" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {critique.severity}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{critique.issue}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Selected Critique Details */}
        {selectedCritique && (
          <div className="mt-6">
            <CritiquePanel critique={selectedCritique} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisDashboard;
