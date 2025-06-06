/*
  # Create initial schema for MCQ examination system
  
  1. New Tables
    - `physics`: Stores physics questions
      - `id` (uuid, primary key)
      - `question_text` (text)
      - `option_a` through `option_d` (text)
      - `correct_option` (enum)
      - `tags` (text array)
      - `difficulty_level` (enum)
    - `chemistry`: Stores chemistry questions
    - `mathematics`: Stores mathematics questions
    - `biology`: Stores biology questions
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create enum types
CREATE TYPE correct_option AS ENUM ('a', 'b', 'c', 'd');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Physics table
CREATE TABLE IF NOT EXISTS physics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
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

-- Create policies for reading data
CREATE POLICY "Allow reading physics questions"
  ON physics
  FOR SELECT
  USING (true);

CREATE POLICY "Allow reading chemistry questions"
  ON chemistry
  FOR SELECT
  USING (true);

CREATE POLICY "Allow reading mathematics questions"
  ON mathematics
  FOR SELECT
  USING (true);

CREATE POLICY "Allow reading biology questions"
  ON biology
  FOR SELECT
  USING (true);