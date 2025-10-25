import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Film, Sparkles, ArrowRight, Play } from "lucide-react";
import VideoUpload from "@/components/VideoUpload";
import AnalysisDashboard from "@/components/AnalysisDashboard";

const Index = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleVideoUploaded = (videoData: any) => {
    setHasVideo(true);
    // Trigger analysis here in future
  };

  const handleStartAnalysis = () => {
    // Mock analysis data for demo
    const mockData = {
      videoTitle: "Sample Music Video",
      duration: 245,
      scenes: 12,
      critiques: [
        {
          timestamp: "0:32-0:35",
          severity: "critical",
          issue: "Low visual energy during chorus peak",
          fix: "Replace with handheld close-up, 50mm lens, shallow depth of field (f/1.4)",
          storyboardPrompt: "Cinematic close-up portrait of artist, emotional expression, tears reflecting colored stage lights, shallow depth of field bokeh background, warm rim light from right, 50mm lens perspective, film grain texture, music video aesthetic, shot on Arri Alexa, dramatic side lighting, --ar 16:9 --style raw"
        },
        {
          timestamp: "1:23-1:28",
          severity: "critical",
          issue: "Static wide shot during emotional vocal peak lacks intimacy",
          fix: "Replace with handheld close-up, 50mm lens, shallow depth of field (f/1.4)",
          storyboardPrompt: "Cinematic close-up portrait of female artist, emotional expression, tears reflecting colored stage lights, shallow depth of field bokeh background, warm rim light from right, 50mm lens perspective, film grain texture, music video aesthetic, shot on Arri Alexa, dramatic side lighting, --ar 16:9 --style raw"
        }
      ]
    };
    setAnalysisData(mockData);
  };

  if (analysisData) {
    return <AnalysisDashboard data={analysisData} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Video Analysis
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Transform Your
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Music Videos</span>
            </h1>
            <p className="mb-10 text-xl text-muted-foreground md:text-2xl">
              Professional video critique, frame-by-frame analysis, and AI-generated storyboards to elevate your creative vision
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group h-14 gap-2 px-8 text-lg shadow-glow">
                <Upload className="h-5 w-5" />
                Upload Video
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 gap-2 px-8 text-lg">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">Professional tools for music video excellence</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group rounded-lg border border-border bg-gradient-card p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-glow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground">Upload your music video and receive professional analysis in minutes</p>
            </div>
            <VideoUpload onVideoUploaded={handleVideoUploaded} />
            {hasVideo && (
              <div className="mt-6 text-center">
                <Button onClick={handleStartAnalysis} size="lg" className="gap-2 shadow-glow">
                  <Sparkles className="h-5 w-5" />
                  Start Analysis
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: Film,
    title: "Scene Detection",
    description: "Automatic shot segmentation with frame-by-frame metadata extraction and motion analysis"
  },
  {
    icon: Sparkles,
    title: "AI Critique Engine",
    description: "Professional analysis of composition, lighting, color grading, and beat synchronization"
  },
  {
    icon: Upload,
    title: "Storyboard Generation",
    description: "AI-powered visual references with detailed prompts for Midjourney, DALL-E, and Stable Diffusion"
  },
  {
    icon: Film,
    title: "Beat Alignment",
    description: "Audio extraction and tempo analysis to ensure perfect visual-musical synchronization"
  },
  {
    icon: Sparkles,
    title: "Technical Recommendations",
    description: "Specific camera, lighting, and performance direction with exact technical parameters"
  },
  {
    icon: Upload,
    title: "Export & Share",
    description: "PDF reports, JSON exports, and shareable links for seamless director-DP collaboration"
  }
];

export default Index;
