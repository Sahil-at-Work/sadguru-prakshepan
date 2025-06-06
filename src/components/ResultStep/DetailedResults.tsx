import React, { useState } from 'react';
import { ExamResult, Subject } from '../../types';
import QuestionCard from '../ExamStep/QuestionCard';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface DetailedResultsProps {
  result: ExamResult;
}

const DetailedResults: React.FC<DetailedResultsProps> = ({ result }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  
  const subjectOptions: { value: Subject; label: string }[] = [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'biology', label: 'Biology' },
  ];
  
  const filteredResults = result.questionDetails.filter(detail => {
    // Text search
    const matchesSearch = searchTerm === '' || 
      detail.question.question_text.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Subject filter
    const matchesSubject = selectedSubjects.length === 0 || 
      selectedSubjects.includes(detail.question.subject);
    
    // Status filter
    let matchesStatus = true;
    if (statusFilter === 'correct') {
      matchesStatus = detail.isCorrect;
    } else if (statusFilter === 'incorrect') {
      matchesStatus = !detail.isCorrect && detail.userAnswer !== null;
    } else if (statusFilter === 'unanswered') {
      matchesStatus = detail.userAnswer === null;
    }
    
    return matchesSearch && matchesSubject && matchesStatus;
  });
  
  const toggleSubject = (subject: Subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detailed Question Analysis
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
              rightIcon={showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredResults.length} of {result.questionDetails.length} questions
            </div>
          </div>
          
          {showFilters && (
            <div className="p-4 bg-gray-50 rounded-md space-y-4 dark:bg-gray-800">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Filter by Subject
                </h3>
                <div className="flex flex-wrap gap-2">
                  {subjectOptions.map(subject => (
                    <button
                      key={subject.value}
                      onClick={() => toggleSubject(subject.value)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedSubjects.includes(subject.value)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {subject.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Filter by Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter('correct')}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      statusFilter === 'correct'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Correct
                  </button>
                  <button
                    onClick={() => setStatusFilter('incorrect')}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      statusFilter === 'incorrect'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Incorrect
                  </button>
                  <button
                    onClick={() => setStatusFilter('unanswered')}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      statusFilter === 'unanswered'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Unanswered
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <div className="space-y-6">
        {filteredResults.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No questions match your filters.</p>
          </Card>
        ) : (
          filteredResults.map((detail, index) => (
            <QuestionCard
              key={detail.question.id}
              question={detail.question}
              userAnswer={{ 
                questionId: detail.question.id, 
                selectedOption: detail.userAnswer 
              }}
              onChange={() => {}} // No-op function since this is review mode
              isReview={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DetailedResults;