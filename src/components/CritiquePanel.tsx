import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Camera, Lightbulb, Copy, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface CritiquePanelProps {
  critique: {
    timestamp: string;
    severity: string;
    issue: string;
    fix: string;
    storyboardPrompt: string;
  };
}

const CritiquePanel = ({ critique }: CritiquePanelProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-gradient-card p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-lg font-semibold text-accent">{critique.timestamp}</span>
              <Badge variant={critique.severity === "critical" ? "destructive" : "secondary"}>
                {critique.severity}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold">{critique.issue}</h3>
          </div>
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/50 px-6">
          <TabsTrigger value="analysis" className="gap-2">
            <Camera className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="storyboard" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Storyboard Prompt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Issue Description</h4>
              <p className="text-muted-foreground">{critique.issue}</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Root Cause</h4>
              <p className="text-muted-foreground">
                Technical: Poor framing and static camera movement
                <br />
                Creative: Emotional disconnect between performance and visual presentation
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold">Recommended Fix</h4>
              <p className="rounded-lg bg-accent/10 p-4 text-accent">{critique.fix}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h5 className="mb-2 text-sm font-semibold">Camera Settings</h5>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Lens: 50mm prime</li>
                  <li>• Aperture: f/1.4</li>
                  <li>• Movement: Handheld</li>
                  <li>• Distance: 3-4 feet from subject</li>
                </ul>
              </div>
              <div>
                <h5 className="mb-2 text-sm font-semibold">Lighting Setup</h5>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Key: Soft, camera left</li>
                  <li>• Rim: Warm, camera right</li>
                  <li>• Practicals: Colored stage lights</li>
                  <li>• Temperature: 3200K-5600K mix</li>
                </ul>
              </div>
            </div>

            <div>
              <h5 className="mb-2 text-sm font-semibold">Performance Direction</h5>
              <p className="text-sm text-muted-foreground">
                Direct talent to increase emotional intensity. Encourage authentic vulnerability.
                Consider adding subtle movement or gesture to enhance connection with lyrics.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="storyboard" className="p-6">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold">AI Prompt for Image Generation</h4>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={() => copyToClipboard(critique.storyboardPrompt)}
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
                {critique.storyboardPrompt}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-gradient-card p-4">
              <h5 className="mb-2 text-sm font-semibold">Compatible With</h5>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Midjourney</Badge>
                <Badge variant="secondary">DALL-E 3</Badge>
                <Badge variant="secondary">Stable Diffusion</Badge>
                <Badge variant="secondary">Leonardo.ai</Badge>
              </div>
            </div>

            <div>
              <Button className="w-full gap-2 shadow-glow">
                <ImageIcon className="h-4 w-4" />
                Generate Storyboard Image
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CritiquePanel;
