import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

interface ExamNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isAnswered: boolean;
  allAnswered: boolean;
}

const ExamNavigation: React.FC<ExamNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isAnswered,
  allAnswered,
}) => {
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst}
        leftIcon={<ChevronLeft size={20} />}
      >
        Previous
      </Button>
      
      <div className="flex space-x-3">
        {isLast && (
          <Button
            variant="success"
            onClick={onSubmit}
            rightIcon={<CheckCircle size={20} />}
          >
            Submit Exam
          </Button>
        )}
        
        {!isLast && (
          <Button
            variant="primary"
            onClick={onNext}
            rightIcon={<ChevronRight size={20} />}
          >
            {isAnswered ? 'Next' : 'Skip'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExamNavigation;