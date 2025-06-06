import React, { useRef } from 'react';
import { ExamResult } from '../../types';
import Button from '../ui/Button';
import { Printer } from 'lucide-react';

interface PrintableReportProps {
  result: ExamResult;
}

const PrintableReport: React.FC<PrintableReportProps> = ({ result }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    const printContent = reportRef.current?.innerHTML || '';
    const originalContent = document.body.innerHTML;
    
    const printStyles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
        }
        .report-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 2px solid #ddd;
        }
        .summary-box {
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .result-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .result-item {
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
        }
        .question-list {
          margin-top: 30px;
        }
        .question-item {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .question-text {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .question-image {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 5px;
        }
        .options {
          margin-left: 20px;
        }
        .correct {
          color: #22c55e;
        }
        .incorrect {
          color: #ef4444;
        }
        .unanswered {
          color: #f59e0b;
        }
        .option-item {
          margin-bottom: 5px;
        }
        .subject-tag {
          display: inline-block;
          background-color: #e0e7ff;
          color: #4f46e5;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin-right: 5px;
        }
        .difficulty-tag {
          display: inline-block;
          background-color: #f0fdf4;
          color: #16a34a;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    `;
    
    document.body.innerHTML = printStyles + '<div class="printable-report">' + printContent + '</div>';
    window.print();
    document.body.innerHTML = originalContent;
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Exam Report
        </h2>
        <Button
          variant="primary"
          leftIcon={<Printer size={18} />}
          onClick={handlePrint}
        >
          Print Report
        </Button>
      </div>
      
      <div 
        ref={reportRef} 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
      >
        <div className="report-header">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Exam Results Report</h1>
          <p className="text-gray-600 dark:text-gray-300">Generated on {formatDate(new Date())}</p>
        </div>
        
        <div className="summary-box bg-gray-50 dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Result Summary</h2>
          <p className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Score: {result.percentage.toFixed(1)}% ({result.correctAnswers} out of {result.totalQuestions})
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Exam Date:</strong> {formatDate(result.startTime)}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Time Spent:</strong> {result.timeSpent}
          </p>
        </div>
        
        <div className="result-grid">
          <div className="result-item bg-gray-50 dark:bg-gray-700">
            <h3 className="text-gray-600 dark:text-gray-300">Total Questions</h3>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{result.totalQuestions}</p>
          </div>
          <div className="result-item bg-gray-50 dark:bg-gray-700">
            <h3 className="text-gray-600 dark:text-gray-300">Correct Answers</h3>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{result.correctAnswers}</p>
          </div>
          <div className="result-item bg-gray-50 dark:bg-gray-700">
            <h3 className="text-gray-600 dark:text-gray-300">Incorrect/Unanswered</h3>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">{result.totalQuestions - result.correctAnswers}</p>
          </div>
        </div>
        
        <div className="question-list">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Question Details</h2>
          
          {result.questionDetails.map((detail, index) => (
            <div key={detail.question.id} className="question-item border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900 dark:text-white">Question {index + 1}</span>
                <div>
                  <span className="subject-tag dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                    {detail.question.subject.charAt(0).toUpperCase() + detail.question.subject.slice(1)}
                  </span>
                  {detail.question.difficulty_level && (
                    <span className={`difficulty-tag ${
                      detail.question.difficulty_level === 'easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : detail.question.difficulty_level === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {detail.question.difficulty_level.charAt(0).toUpperCase() + detail.question.difficulty_level.slice(1)}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="question-text text-gray-900 dark:text-white">{detail.question.question_text}</p>
              
              {detail.question.question_image && (
                <img
                  src={detail.question.question_image}
                  alt="Question illustration"
                  className="question-image max-w-full h-auto rounded-lg my-4"
                />
              )}
              
              <div className="options">
                {(['a', 'b', 'c', 'd'] as const).map(option => (
                  <div 
                    key={option} 
                    className={`option-item ${
                      detail.question.correct_option === option
                        ? 'correct dark:text-emerald-400'
                        : detail.userAnswer === option
                        ? 'incorrect dark:text-red-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="font-medium">{option.toUpperCase()}.</span> {detail.question[`option_${option}`]}
                    {detail.question.correct_option === option && ' ✓'}
                    {detail.userAnswer === option && detail.question.correct_option !== option && ' ✗'}
                  </div>
                ))}
              </div>
              
              <div className="mt-2">
                {detail.userAnswer === null ? (
                  <p className="unanswered dark:text-yellow-400">Not answered</p>
                ) : detail.isCorrect ? (
                  <p className="correct dark:text-emerald-400">Correct</p>
                ) : (
                  <p className="incorrect dark:text-red-400">
                    Incorrect. Correct answer: {detail.question.correct_option.toUpperCase()}
                  </p>
                )}
              </div>
              
              <div className="mt-2 text-gray-600 dark:text-gray-300">
                <strong>Tags:</strong> {detail.question.tags.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintableReport;