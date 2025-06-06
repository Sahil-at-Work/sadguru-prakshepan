export type Subject = 'physics' | 'chemistry' | 'mathematics' | 'biology';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type CorrectOption = 'a' | 'b' | 'c' | 'd';

export interface Question {
  id: string;
  question_text: string;
  question_image?: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: CorrectOption;
  tags: string[];
  difficulty_level?: DifficultyLevel;
  subject: Subject;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: CorrectOption | null;
}

export interface ExamConfig {
  subjects: Subject[];
  tags: string[];
  numberOfQuestions: number;
}

export interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  questionDetails: {
    question: Question;
    userAnswer: CorrectOption | null;
    isCorrect: boolean;
  }[];
  timeSpent: string;
  startTime: Date;
  endTime: Date;
}