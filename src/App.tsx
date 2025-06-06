import React, { useState } from 'react';
import ExamConfigForm from './components/ConfigStep/ExamConfigForm';
import ExamInterface from './components/ExamStep/ExamInterface';
import ResultPage from './components/ResultStep/ResultPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { ExamConfig, ExamResult } from './types';

type AppStep = 'config' | 'exam' | 'result';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('config');
  const [examConfig, setExamConfig] = useState<ExamConfig | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const handleStartExam = (config: ExamConfig) => {
    setExamConfig(config);
    setCurrentStep('exam');
  };

  const handleCompleteExam = (result: ExamResult) => {
    setExamResult(result);
    setCurrentStep('result');
  };

  const handleRetakeExam = () => {
    // Keep the same config but restart the exam
    if (examConfig) {
      setCurrentStep('exam');
    }
  };

  const handleNewExam = () => {
    setExamConfig(null);
    setExamResult(null);
    setCurrentStep('config');
  };

  const handleCancelExam = () => {
    setCurrentStep('config');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentStep === 'config' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
              Dynamic Subject-Based MCQ Examination System
            </h1>
            <ExamConfigForm onStartExam={handleStartExam} />
          </div>
        )}
        
        {currentStep === 'exam' && examConfig && (
          <ExamInterface 
            config={examConfig} 
            onComplete={handleCompleteExam}
            onCancel={handleCancelExam} 
          />
        )}
        
        {currentStep === 'result' && examResult && (
          <ResultPage 
            result={examResult} 
            onRetakeExam={handleRetakeExam}
            onNewExam={handleNewExam}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;