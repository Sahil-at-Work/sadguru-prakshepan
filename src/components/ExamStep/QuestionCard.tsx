import React, { useRef, useEffect } from 'react';
import { CorrectOption, Question, UserAnswer } from '../../types';
import Card from '../ui/Card';

interface QuestionCardProps {
  question: Question;
  userAnswer: UserAnswer;
  onChange: (answer: CorrectOption) => void;
  isReview?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  onChange,
  isReview = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll to question when it becomes visible
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [question.id]);

  const isAnswered = userAnswer.selectedOption !== null;
  const isCorrect = isReview && userAnswer.selectedOption === question.correct_option;
  const isIncorrect = isReview && userAnswer.selectedOption !== null && userAnswer.selectedOption !== question.correct_option;

  const getOptionClasses = (option: CorrectOption) => {
    const baseClasses = 'flex items-start p-4 rounded-lg border-2 transition-all mb-3';

    if (isReview) {
      if (option === question.correct_option) {
        return `${baseClasses} border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700`;
      } 
      if (option === userAnswer.selectedOption && option !== question.correct_option) {
        return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-700`;
      }
      return `${baseClasses} border-gray-200 dark:border-gray-700`;
    }

    if (userAnswer.selectedOption === option) {
      return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700`;
    }
    
    return `${baseClasses} border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50`;
  };

  return (
    <Card 
      ref={cardRef}
      className="mb-6 transition-opacity duration-300 opacity-100"
      shadow="md"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {question.subject.charAt(0).toUpperCase() + question.subject.slice(1)}
            </span>
            {question.tags.map(tag => (
              <span 
                key={tag} 
                className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          {question.difficulty_level && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${question.difficulty_level === 'easy' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                : question.difficulty_level === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {question.difficulty_level.charAt(0).toUpperCase() + question.difficulty_level.slice(1)}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {question.question_text}
        </h3>

        {question.question_image && (
          <div className="relative w-full h-64 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={question.question_image}
              alt="Question illustration"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="space-y-1">
          {(['a', 'b', 'c', 'd'] as CorrectOption[]).map((option) => (
            <div 
              key={option} 
              className={getOptionClasses(option)}
              onClick={() => !isReview && onChange(option)}
              role={isReview ? 'presentation' : 'button'}
              tabIndex={isReview ? undefined : 0}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-6 w-6 mr-4 rounded-full border flex items-center justify-center
                  ${userAnswer.selectedOption === option 
                    ? 'bg-blue-500 border-blue-500 text-white dark:bg-blue-600' 
                    : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700'
                  }`}
                >
                  {option.toUpperCase()}
                </div>
                <div className="text-gray-800 dark:text-gray-200">
                  {(question as any)[`option_${option}`]}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {isReview && (
          <div className={`mt-4 p-4 rounded-md ${
            isCorrect 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' 
              : isIncorrect
              ? 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
              : 'bg-yellow-50 border border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300'
          }`}>
            {isCorrect 
              ? 'Correct answer! Good job!' 
              : isIncorrect
              ? `Incorrect. The correct answer is ${question.correct_option.toUpperCase()}.`
              : 'You did not answer this question.'}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionCard;