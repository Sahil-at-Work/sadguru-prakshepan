/*
  # Add user authentication and exam results tracking
  
  1. New Tables
    - `profiles`: Stores user profile information
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `created_at` (timestamp)
    - `exam_results`: Stores detailed exam results
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `total_questions` (integer)
      - `correct_answers` (integer)
      - `percentage` (numeric)
      - `time_spent` (interval)
      - `started_at` (timestamp)
      - `completed_at` (timestamp)
    - `exam_answers`: Stores individual question answers
      - `id` (uuid, primary key)
      - `result_id` (uuid, references exam_results)
      - `question_id` (uuid)
      - `subject` (text)
      - `selected_option` (correct_option)
      - `is_correct` (boolean)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create exam results table
CREATE TABLE public.exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  percentage numeric NOT NULL,
  time_spent interval NOT NULL,
  started_at timestamptz NOT NULL,
  completed_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create exam answers table
CREATE TABLE public.exam_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id uuid REFERENCES public.exam_results ON DELETE CASCADE NOT NULL,
  question_id uuid NOT NULL,
  subject text NOT NULL,
  selected_option correct_option,
  is_correct boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can read own exam results"
  ON public.exam_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam results"
  ON public.exam_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own exam answers"
  ON public.exam_answers
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.exam_results
    WHERE exam_results.id = exam_answers.result_id
    AND exam_results.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own exam answers"
  ON public.exam_answers
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.exam_results
    WHERE exam_results.id = exam_answers.result_id
    AND exam_results.user_id = auth.uid()
  ));