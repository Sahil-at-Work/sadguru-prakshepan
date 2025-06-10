import React from 'react';
import { track } from '@vercel/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Custom analytics tracking functions
export const trackExamStart = (config: {
  subjects: string[];
  tags: string[];
  numberOfQuestions: number;
}) => {
  track('exam_started', {
    subjects: config.subjects.join(','),
    tags: config.tags.join(','),
    question_count: config.numberOfQuestions,
  });
};

export const trackExamComplete = (result: {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeSpent: string;
}) => {
  track('exam_completed', {
    total_questions: result.totalQuestions,
    correct_answers: result.correctAnswers,
    percentage: result.percentage,
    time_spent: result.timeSpent,
  });
};

export const trackQuestionAnswer = (data: {
  questionId: string;
  subject: string;
  isCorrect: boolean;
  timeSpent?: number;
}) => {
  track('question_answered', {
    question_id: data.questionId,
    subject: data.subject,
    is_correct: data.isCorrect,
    time_spent: data.timeSpent,
  });
};

export const trackConfigurationChange = (type: string, value: any) => {
  track('configuration_changed', {
    type,
    value: typeof value === 'object' ? JSON.stringify(value) : value,
  });
};

export const trackPrintReport = () => {
  track('report_printed');
};

export const trackRetakeExam = () => {
  track('exam_retaken');
};

export const trackNewExam = () => {
  track('new_exam_started');
};

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default AnalyticsProvider;