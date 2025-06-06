import React from 'react';
import { UserAnswer } from '../../types';

interface ExamProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
  timeLeft: number;
  totalTime: number;
  onJumpToQuestion: (index: number) => void;
}

const ExamProgress: React.FC<ExamProgressProps> = ({
  currentQuestion,
  totalQuestions,
  userAnswers,
  timeLeft,
  totalTime,
  onJumpToQuestion,
}) => {
  const answeredCount = userAnswers.filter(a => a.selectedOption !== null).length;
  const percentComplete = (answeredCount / totalQuestions) * 100;
  const timePercentLeft = (timeLeft / totalTime) * 100;
  
  const getTimeColor = () => {
    if (timePercentLeft > 50) return 'bg-emerald-500';
    if (timePercentLeft > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Format time left in minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 sticky top-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Remaining</h3>
          <div className="mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className={`h-2.5 rounded-full ${getTimeColor()}`} 
                style={{ width: `${timePercentLeft}%` }}
              ></div>
            </div>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</h3>
          <div className="mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="h-2.5 rounded-full bg-blue-600" 
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <p>{answeredCount} of {totalQuestions} answered</p>
              <p>{Math.round(percentComplete)}% complete</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Question Navigator</h3>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {userAnswers.map((answer, index) => (
              <button
                key={index}
                className={`h-8 w-full flex items-center justify-center rounded text-sm font-medium
                  ${currentQuestion === index 
                    ? 'ring-2 ring-blue-500 font-bold' 
                    : ''
                  } 
                  ${answer.selectedOption 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                onClick={() => onJumpToQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamProgress;