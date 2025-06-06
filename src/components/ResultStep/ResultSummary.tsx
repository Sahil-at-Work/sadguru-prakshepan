import React from 'react';
import { ExamResult } from '../../types';
import Card from '../ui/Card';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ResultSummaryProps {
  result: ExamResult;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ result }) => {
  const { correctAnswers, totalQuestions, percentage, timeSpent } = result;
  
  const getPerformanceColor = () => {
    if (percentage >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getPerformanceText = () => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
  };

  const getGradeColor = () => {
    if (percentage >= 90) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    if (percentage >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (percentage >= 70) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (percentage >= 40) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  const getGrade = () => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    if (percentage >= 40) return 'E';
    return 'F';
  };
  
  return (
    <Card className="mb-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Exam Result Summary
        </h2>
        
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full mb-4 dark:bg-blue-900/20">
          <Trophy className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="mb-6">
          <div className="text-5xl font-bold mb-2 transition-colors duration-300 ease-in-out" style={{color: getPerformanceColor()}}>
            {percentage.toFixed(1)}%
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor()}`}>
            Grade: {getGrade()}
          </span>
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mt-1">
            {getPerformanceText()}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-emerald-500 dark:text-emerald-400 mr-2" />
              <span className="text-lg font-medium text-gray-900 dark:text-white">Correct</span>
            </div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {correctAnswers}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
              <span className="text-lg font-medium text-gray-900 dark:text-white">Incorrect</span>
            </div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {totalQuestions - correctAnswers}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
              <span className="text-lg font-medium text-gray-900 dark:text-white">Time Spent</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {timeSpent}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 dark:bg-gray-700">
          <div 
            className={`h-4 rounded-full ${percentage >= 60 ? 'bg-emerald-500' : 'bg-red-500'}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {correctAnswers} correct out of {totalQuestions} questions
        </div>
      </div>
    </Card>
  );
};

export default ResultSummary;