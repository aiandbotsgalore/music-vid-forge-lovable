-- Create storage bucket for video uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  524288000, -- 500MB limit
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo']
);

-- Create policy for public video uploads
CREATE POLICY "Anyone can upload videos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'videos');

-- Create policy for public video access
CREATE POLICY "Anyone can view videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'videos');

-- Create table to store video metadata and analysis results
CREATE TABLE public.video_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_url TEXT NOT NULL,
  video_title TEXT NOT NULL,
  duration INTEGER,
  scenes INTEGER,
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on video_analyses
ALTER TABLE public.video_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to video analyses
CREATE POLICY "Anyone can view video analyses"
ON public.video_analyses FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can create video analyses"
ON public.video_analyses FOR INSERT
TO public
WITH CHECK (true);