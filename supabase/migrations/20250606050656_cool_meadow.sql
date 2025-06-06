/*
  # Add question image support and ensure safe policy creation
  
  1. Changes
    - Add question_image column to all subject tables
    - Safe creation of enum types
    - Safe creation of policies
  
  2. Security
    - Maintain RLS on all tables
    - Safe policy creation with existence checks
*/

-- Create enum types if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'correct_option') THEN
    CREATE TYPE correct_option AS ENUM ('a', 'b', 'c', 'd');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'difficulty_level') THEN
    CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');
  END IF;
END $$;

-- Physics table
CREATE TABLE IF NOT EXISTS physics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_image text,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option correct_option NOT NULL,
  tags text[] NOT NULL,
  difficulty_level difficulty_level DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Chemistry table
CREATE TABLE IF NOT EXISTS chemistry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_image text,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option correct_option NOT NULL,
  tags text[] NOT NULL,
  difficulty_level difficulty_level DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Mathematics table
CREATE TABLE IF NOT EXISTS mathematics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_image text,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option correct_option NOT NULL,
  tags text[] NOT NULL,
  difficulty_level difficulty_level DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Biology table
CREATE TABLE IF NOT EXISTS biology (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_image text,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option correct_option NOT NULL,
  tags text[] NOT NULL,
  difficulty_level difficulty_level DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE physics ENABLE ROW LEVEL SECURITY;
ALTER TABLE chemistry ENABLE ROW LEVEL SECURITY;
ALTER TABLE mathematics ENABLE ROW LEVEL SECURITY;
ALTER TABLE biology ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'physics' AND policyname = 'Allow reading physics questions'
  ) THEN
    CREATE POLICY "Allow reading physics questions"
      ON physics
      FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chemistry' AND policyname = 'Allow reading chemistry questions'
  ) THEN
    CREATE POLICY "Allow reading chemistry questions"
      ON chemistry
      FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mathematics' AND policyname = 'Allow reading mathematics questions'
  ) THEN
    CREATE POLICY "Allow reading mathematics questions"
      ON mathematics
      FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'biology' AND policyname = 'Allow reading biology questions'
  ) THEN
    CREATE POLICY "Allow reading biology questions"
      ON biology
      FOR SELECT
      USING (true);
  END IF;
END $$;