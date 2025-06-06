/*
  # Add image support and sample questions with images
  
  1. Schema Changes
    - Add question_image column to all subject tables
  
  2. Data
    - Add sample questions with images for each subject
*/

-- Add question_image column to all tables
ALTER TABLE physics ADD COLUMN IF NOT EXISTS question_image text;
ALTER TABLE chemistry ADD COLUMN IF NOT EXISTS question_image text;
ALTER TABLE mathematics ADD COLUMN IF NOT EXISTS question_image text;
ALTER TABLE biology ADD COLUMN IF NOT EXISTS question_image text;

-- Physics questions with images
INSERT INTO physics (question_text, question_image, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  (
    'What type of simple machine is shown in this image?',
    'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
    'Pulley',
    'Lever',
    'Inclined plane',
    'Wheel and axle',
    'b',
    ARRAY['mechanics', 'simple-machines'],
    'easy'
  ),
  (
    'Looking at this circuit diagram, what will happen to the brightness of the bulbs if one burns out?',
    'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    'All bulbs will go out',
    'Only the burnt bulb will go out',
    'The remaining bulbs will get brighter',
    'The remaining bulbs will get dimmer',
    'a',
    ARRAY['electricity', 'circuits'],
    'medium'
  );

-- Chemistry questions with images
INSERT INTO chemistry (question_text, question_image, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  (
    'What type of laboratory glassware is shown in this image?',
    'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    'Beaker',
    'Erlenmeyer flask',
    'Test tube',
    'Volumetric flask',
    'b',
    ARRAY['lab-equipment', 'glassware'],
    'easy'
  ),
  (
    'Based on the color change shown in this titration, what is the likely pH of the solution?',
    'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
    'pH 3',
    'pH 7',
    'pH 9',
    'pH 14',
    'c',
    ARRAY['acids-bases', 'indicators'],
    'medium'
  );

-- Mathematics questions with images
INSERT INTO mathematics (question_text, question_image, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  (
    'What is the approximate angle marked in red in this geometric figure?',
    'https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg',
    '30 degrees',
    '45 degrees',
    '60 degrees',
    '90 degrees',
    'c',
    ARRAY['geometry', 'angles'],
    'easy'
  ),
  (
    'Using the graph shown, what is the slope of the line?',
    'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg',
    '1/2',
    '2',
    '-1/2',
    '-2',
    'b',
    ARRAY['algebra', 'linear-functions'],
    'medium'
  );

-- Biology questions with images
INSERT INTO biology (question_text, question_image, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  (
    'Which organelle is highlighted in green in this cell image?',
    'https://images.pexels.com/photos/2280575/pexels-photo-2280575.jpeg',
    'Nucleus',
    'Mitochondria',
    'Golgi apparatus',
    'Endoplasmic reticulum',
    'a',
    ARRAY['cell-biology', 'organelles'],
    'easy'
  ),
  (
    'What type of tissue is shown in this microscope image?',
    'https://images.pexels.com/photos/2280577/pexels-photo-2280577.jpeg',
    'Epithelial tissue',
    'Connective tissue',
    'Muscle tissue',
    'Nervous tissue',
    'b',
    ARRAY['histology', 'tissues'],
    'medium'
  );