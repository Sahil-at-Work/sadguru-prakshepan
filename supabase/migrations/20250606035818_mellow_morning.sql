/*
  # Seed sample questions for MCQ examination system
  
  This migration adds sample questions to each subject table to allow
  testing the application without needing to create questions manually.
*/

-- Physics sample questions
INSERT INTO physics (question_text, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  ('What is the SI unit of force?', 'Newton', 'Joule', 'Watt', 'Pascal', 'a', ARRAY['mechanics', 'units'], 'easy'),
  ('Which of the following is a vector quantity?', 'Mass', 'Time', 'Velocity', 'Energy', 'c', ARRAY['mechanics', 'vectors'], 'easy'),
  ('The principle of conservation of energy states that energy can be:', 'Created but not destroyed', 'Destroyed but not created', 'Neither created nor destroyed', 'Both created and destroyed', 'c', ARRAY['thermodynamics', 'energy'], 'medium'),
  ('Which law states that for every action, there is an equal and opposite reaction?', 'Newton''s First Law', 'Newton''s Second Law', 'Newton''s Third Law', 'Law of Conservation of Momentum', 'c', ARRAY['mechanics', 'newton-laws'], 'easy'),
  ('What is the formula for kinetic energy?', 'KE = mgh', 'KE = 0.5mv²', 'KE = Fd', 'KE = mv', 'b', ARRAY['mechanics', 'energy'], 'easy'),
  ('Which phenomenon explains the bending of light when it passes from one medium to another?', 'Reflection', 'Refraction', 'Diffraction', 'Interference', 'b', ARRAY['optics', 'light'], 'medium'),
  ('What is the formula for Ohm''s Law?', 'V = IR', 'P = IV', 'F = ma', 'E = mc²', 'a', ARRAY['electricity', 'circuits'], 'easy'),
  ('Which of these particles has a positive charge?', 'Electron', 'Proton', 'Neutron', 'Photon', 'b', ARRAY['atomic', 'particles'], 'easy'),
  ('What is the principle behind a transformer?', 'Electromagnetic induction', 'Coulomb''s law', 'Conservation of charge', 'Photoelectric effect', 'a', ARRAY['electricity', 'magnetism'], 'medium'),
  ('The Doppler effect relates to what property of waves?', 'Amplitude', 'Frequency', 'Wavelength', 'Both B and C', 'd', ARRAY['waves', 'sound'], 'medium');

-- Chemistry sample questions
INSERT INTO chemistry (question_text, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  ('What is the chemical symbol for gold?', 'Au', 'Ag', 'Fe', 'Cu', 'a', ARRAY['periodic-table', 'elements'], 'easy'),
  ('Which of the following is not a noble gas?', 'Helium', 'Neon', 'Nitrogen', 'Argon', 'c', ARRAY['periodic-table', 'gases'], 'easy'),
  ('What is the pH of a neutral solution at 25°C?', '0', '7', '14', '1', 'b', ARRAY['acids-bases', 'solutions'], 'easy'),
  ('Which of these is an example of a chemical change?', 'Melting ice', 'Dissolving salt in water', 'Cutting paper', 'Burning wood', 'd', ARRAY['reactions', 'physical-chemical-changes'], 'easy'),
  ('Which type of bond involves the sharing of electrons?', 'Ionic', 'Covalent', 'Metallic', 'Hydrogen', 'b', ARRAY['bonding', 'molecular-structure'], 'medium'),
  ('What is the main component of natural gas?', 'Ethane', 'Propane', 'Methane', 'Butane', 'c', ARRAY['organic', 'hydrocarbons'], 'medium'),
  ('Which of these is not an alkali metal?', 'Sodium', 'Potassium', 'Magnesium', 'Lithium', 'c', ARRAY['periodic-table', 'metals'], 'medium'),
  ('What does DNA stand for?', 'Diribonucleic Acid', 'Deoxyribonucleic Acid', 'Dinitro Acid', 'Deoxyribose Nucleic Arrangement', 'b', ARRAY['biochemistry', 'macromolecules'], 'easy'),
  ('In an endothermic reaction:', 'Heat is released', 'Heat is absorbed', 'No heat change occurs', 'Temperature remains constant', 'b', ARRAY['thermochemistry', 'reactions'], 'medium'),
  ('Which of the following is not a state of matter?', 'Solid', 'Liquid', 'Gas', 'Energy', 'd', ARRAY['states-of-matter', 'physical-properties'], 'easy');

-- Mathematics sample questions
INSERT INTO mathematics (question_text, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  ('What is the value of π (pi) to two decimal places?', '3.41', '3.14', '3.12', '3.18', 'b', ARRAY['constants', 'geometry'], 'easy'),
  ('What is the square root of 144?', '14', '12', '10', '16', 'b', ARRAY['algebra', 'arithmetic'], 'easy'),
  ('Solve for x: 2x + 5 = 15', 'x = 5', 'x = 10', 'x = 7.5', 'x = 5.5', 'a', ARRAY['algebra', 'equations'], 'easy'),
  ('What is the derivative of f(x) = x²?', 'f′(x) = 2x', 'f′(x) = x²', 'f′(x) = 2', 'f′(x) = x', 'a', ARRAY['calculus', 'derivatives'], 'medium'),
  ('What is the formula for the area of a circle?', 'A = 2πr', 'A = πr²', 'A = πd', 'A = 2πr²', 'b', ARRAY['geometry', 'area'], 'easy'),
  ('What is the value of sin(90°)?', '0', '1', '√2', '∞', 'b', ARRAY['trigonometry', 'special-angles'], 'medium'),
  ('If P(A) = 0.3 and P(B) = 0.4, and A and B are independent events, what is P(A and B)?', '0.12', '0.7', '0.1', '0.3', 'a', ARRAY['probability', 'independence'], 'medium'),
  ('What is the integral of f(x) = 2x?', 'f(x) = x² + C', 'f(x) = x² + 2C', 'f(x) = 2x² + C', 'f(x) = x² - C', 'a', ARRAY['calculus', 'integration'], 'medium'),
  ('What is the equation of a line with slope 2 passing through the point (1,3)?', 'y = 2x + 1', 'y = 2x + 2', 'y = 2x', 'y = 2x + 3', 'a', ARRAY['coordinate-geometry', 'linear-equations'], 'medium'),
  ('What is the sum of the interior angles of a hexagon?', '360°', '540°', '720°', '1080°', 'c', ARRAY['geometry', 'polygons'], 'medium');

-- Biology sample questions
INSERT INTO biology (question_text, option_a, option_b, option_c, option_d, correct_option, tags, difficulty_level)
VALUES
  ('What is the powerhouse of the cell?', 'Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'b', ARRAY['cell-biology', 'organelles'], 'easy'),
  ('Which of the following is not a nucleotide base found in DNA?', 'Adenine', 'Cytosine', 'Uracil', 'Guanine', 'c', ARRAY['genetics', 'molecular-biology'], 'easy'),
  ('The process by which plants make their food is called:', 'Respiration', 'Photosynthesis', 'Transpiration', 'Digestion', 'b', ARRAY['plants', 'physiology'], 'easy'),
  ('Which blood cells are responsible for immune response?', 'Red blood cells', 'White blood cells', 'Platelets', 'Plasma', 'b', ARRAY['human-physiology', 'immune-system'], 'easy'),
  ('What is the largest organ in the human body?', 'Liver', 'Brain', 'Skin', 'Heart', 'c', ARRAY['human-anatomy', 'organ-systems'], 'easy'),
  ('Which of the following is not a greenhouse gas?', 'Carbon dioxide', 'Methane', 'Nitrogen', 'Water vapor', 'c', ARRAY['ecology', 'environment'], 'medium'),
  ('The process of breakdown of food into simpler substances is called:', 'Ingestion', 'Digestion', 'Absorption', 'Assimilation', 'b', ARRAY['human-physiology', 'digestive-system'], 'easy'),
  ('Which of these is NOT a part of Darwin''s theory of evolution?', 'Natural selection', 'Inheritance of acquired characteristics', 'Variation', 'Struggle for existence', 'b', ARRAY['evolution', 'theories'], 'medium'),
  ('What is the site of protein synthesis in the cell?', 'Nucleus', 'Mitochondria', 'Ribosomes', 'Golgi Apparatus', 'c', ARRAY['cell-biology', 'molecular-biology'], 'medium'),
  ('Which of the following is an example of negative feedback in the human body?', 'Blood clotting', 'Temperature regulation', 'Childbirth', 'Digestion of food', 'b', ARRAY['human-physiology', 'homeostasis'], 'medium');