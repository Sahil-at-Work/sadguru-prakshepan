import React, { useEffect, useState } from 'react';
import { formatTime } from '../../lib/timerUtils';

interface ExamTimerProps {
  durationInSeconds: number;
  onTimeUp: () => void;
  onTimeUpdate: (timeLeft: number) => void;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ 
  durationInSeconds, 
  onTimeUp,
  onTimeUpdate,
}) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        // Check for low time warning (5 minutes)
        if (newTime === 300 && !showWarning) {
          setShowWarning(true);
          // You could add a sound effect here too
        }
        
        // Time's up!
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        
        onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationInSeconds, onTimeUp]);
  
  const timePercentage = (timeLeft / durationInSeconds) * 100;
  
  const getTimerColor = () => {
    if (timePercentage > 50) return 'text-emerald-600 dark:text-emerald-400';
    if (timePercentage > 25) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  return (
    <div className="text-center">
      {showWarning && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg animate-pulse dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
          <strong className="font-bold">Warning!</strong>
          <span className="block sm:inline"> 5 minutes remaining!</span>
        </div>
      )}
      
      <div className={`text-2xl font-bold ${getTimerColor()}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default ExamTimer;