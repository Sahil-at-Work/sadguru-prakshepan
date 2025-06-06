import React, { useState } from 'react';
import { ExamResult } from '../../types';
import ResultSummary from './ResultSummary';
import DetailedResults from './DetailedResults';
import PrintableReport from './PrintableReport';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ListFilter, Printer, RotateCcw } from 'lucide-react';

interface ResultPageProps {
  result: ExamResult;
  onRetakeExam: () => void;
  onNewExam: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ 
  result, 
  onRetakeExam,
  onNewExam
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'details' | 'print'>('summary');
  
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Exam Completed
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<RotateCcw size={18} />}
            onClick={onRetakeExam}
          >
            Retake Exam
          </Button>
          <Button
            variant="primary"
            onClick={onNewExam}
          >
            New Exam
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'summary'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('details')}
            >
              <ListFilter size={16} className="mr-2" />
              Detailed Analysis
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'print'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('print')}
            >
              <Printer size={16} className="mr-2" />
              Print Report
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'summary' && <ResultSummary result={result} />}
      
      {activeTab === 'details' && <DetailedResults result={result} />}
      
      {activeTab === 'print' && <PrintableReport result={result} />}
    </div>
  );
};

export default ResultPage;