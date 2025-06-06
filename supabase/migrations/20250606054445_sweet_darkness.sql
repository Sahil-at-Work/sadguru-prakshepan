/*
  # Fix exam storage schema

  1. Changes
    - Modify time_spent column to accept string instead of interval
    - Add indexes for better query performance
    - Add cascade delete for exam answers
*/

-- Modify time_spent column to accept string
ALTER TABLE exam_results 
ALTER COLUMN time_spent TYPE text;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_answers_result_id ON exam_answers(result_id);

-- Add cascade delete for exam answers
ALTER TABLE exam_answers
DROP CONSTRAINT IF EXISTS exam_answers_result_id_fkey,
ADD CONSTRAINT exam_answers_result_id_fkey
  FOREIGN KEY (result_id)
  REFERENCES exam_results(id)
  ON DELETE CASCADE;