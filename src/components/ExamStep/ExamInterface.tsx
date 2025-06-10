import React, { useState, useEffect } from 'react';
import { Question, CorrectOption, UserAnswer, ExamResult } from '../../types';
import { fetchQuestionsByConfig } from '../../lib/supabase';
import { ExamConfig } from '../../types';
import { calculateExamDuration, formatTimeSpent } from '../../lib/timerUtils';
import { trackExamComplete, trackQuestionAnswer } from '../Analytics/AnalyticsProvider';
import QuestionCard from './QuestionCard';
import ExamProgress from './ExamProgress';
import ExamNavigation from './ExamNavigation';
import ExamTimer from './ExamTimer';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

interface ExamInterfaceProps {
  config: ExamConfig;
  onComplete: (result: ExamResult) => void;
  onCancel: () => void;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({ 
  config, 
  onComplete,
  onCancel 
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [startTime] = useState(new Date());
  
  const examDuration = calculateExamDuration(config.numberOfQuestions);
  
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedQuestions = await fetchQuestionsByConfig(
          config.subjects,
          config.tags,
          config.numberOfQuestions
        );
        
        if (fetchedQuestions.length === 0) {
          throw new Error('No questions found for the selected criteria');
        }
        
        setQuestions(fetchedQuestions);
        setUserAnswers(
          fetchedQuestions.map(q => ({ questionId: q.id, selectedOption: null }))
        );
      } catch (err) {
        console.error('Error loading questions:', err);
        setError('Failed to load questions. Please try again with different criteria.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [config]);
  
  const handleAnswerChange = (option: CorrectOption) => {
    const newAnswers = [...userAnswers];
    const previousAnswer = newAnswers[currentQuestion].selectedOption;
    newAnswers[currentQuestion].selectedOption = option;
    setUserAnswers(newAnswers);

    // Track question answer if it's a new answer (not changing existing answer)
    if (previousAnswer === null) {
      const currentQuestionData = questions[currentQuestion];
      trackQuestionAnswer({
        questionId: currentQuestionData.id,
        subject: currentQuestionData.subject,
        isCorrect: option === currentQuestionData.correct_option,
      });
    }
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };
  
  const handleTimeUpdate = (newTimeLeft: number) => {
    setTimeLeft(newTimeLeft);
  };
  
  const handleTimeUp = () => {
    handleSubmitExam();
  };
  
  const confirmSubmit = () => {
    const unansweredCount = userAnswers.filter(a => a.selectedOption === null).length;
    if (unansweredCount > 0) {
      setShowConfirmSubmit(true);
    } else {
      handleSubmitExam();
    }
  };
  
  const handleSubmitExam = () => {
    const endTime = new Date();
    
    // Calculate results
    const result: ExamResult = {
      totalQuestions: questions.length,
      correctAnswers: 0,
      percentage: 0,
      questionDetails: [],
      timeSpent: formatTimeSpent(startTime, endTime),
      startTime,
      endTime,
    };
    
    // Process each question and answer
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index].selectedOption;
      const isCorrect = userAnswer === question.correct_option;
      
      if (isCorrect) {
        result.correctAnswers += 1;
      }
      
      result.questionDetails.push({
        question,
        userAnswer,
        isCorrect,
      });
    });
    
    // Calculate percentage
    result.percentage = (result.correctAnswers / result.totalQuestions) * 100;
    
    // Track exam completion
    trackExamComplete({
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      percentage: result.percentage,
      timeSpent: result.timeSpent,
    });
    
    onComplete(result);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your exam questions...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="text-center p-8">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Error Loading Exam
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
        <Button 
          variant="primary" 
          className="mt-6" 
          onClick={onCancel}
        >
          Go Back
        </Button>
      </Card>
    );
  }
  
  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = userAnswers[currentQuestion];
  const isCurrentAnswered = currentAnswer.selectedOption !== null;
  const allAnswered = userAnswers.every(a => a.selectedOption !== null);
  
  return (
    <div className="max-w-5xl mx-auto">
      <ExamTimer 
        durationInSeconds={examDuration} 
        onTimeUp={handleTimeUp}
        onTimeUpdate={handleTimeUpdate}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          {currentQuestionData && (
            <>
              <QuestionCard
                question={currentQuestionData}
                userAnswer={currentAnswer}
                onChange={handleAnswerChange}
              />
              
              <ExamNavigation
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={confirmSubmit}
                isAnswered={isCurrentAnswered}
                allAnswered={allAnswered}
              />
            </>
          )}
        </div>
        
        <div>
          <ExamProgress
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            userAnswers={userAnswers}
            timeLeft={timeLeft}
            totalTime={examDuration}
            onJumpToQuestion={handleJumpToQuestion}
          />
        </div>
      </div>
      
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Submission
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You have {userAnswers.filter(a => a.selectedOption === null).length} unanswered questions. 
              Are you sure you want to submit?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmSubmit(false)}
              >
                Continue Exam
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSubmitExam}
              >
                Submit Anyway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInterface;