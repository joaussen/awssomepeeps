-- =============================================
-- AwssomePeeps Supabase Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- =============================================

-- 1. Candidates table (form submissions)
CREATE TABLE candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Step 1: Identity
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  location TEXT NOT NULL,
  work_style TEXT NOT NULL CHECK (work_style IN ('Remote', 'Hybrid', 'In-Person')),

  -- Step 2: Superpower
  superpower TEXT NOT NULL,
  experience TEXT NOT NULL CHECK (experience IN ('5-10', '10-15', '15-25', '25+')),
  bio TEXT NOT NULL,
  recent_wins TEXT[] DEFAULT '{}',

  -- Step 3: Upload
  resume_url TEXT,
  photo_url TEXT,
  website TEXT,
  github TEXT,
  extra_notes TEXT,

  -- Meta
  turnstile_token TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'hidden'))
);

-- 2. Intro requests table (ISV partner intro requests)
CREATE TABLE intro_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  partner_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  candidate_name TEXT NOT NULL,
  turnstile_token TEXT
);

-- 3. Storage buckets
-- Run these via Supabase Dashboard > Storage, or use SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Row Level Security (RLS)

-- Enable RLS on both tables
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE intro_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT a new candidate (form submission)
CREATE POLICY "Anyone can submit a candidate"
  ON candidates FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can SELECT approved candidates (public directory)
CREATE POLICY "Anyone can view approved candidates"
  ON candidates FOR SELECT
  TO anon
  USING (status = 'approved');

-- Anyone can INSERT an intro request
CREATE POLICY "Anyone can request an intro"
  ON intro_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Storage policies

-- Resumes: anyone can upload, only authenticated can read
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'resumes');

-- Photos: anyone can upload and read (public bucket)
CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'photos');
