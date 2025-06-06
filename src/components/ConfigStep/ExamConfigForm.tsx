import React, { useState, useEffect } from 'react';
import { ExamConfig, Subject } from '../../types';
import SubjectSelector from './SubjectSelector';
import TagSelector from './TagSelector';
import NumberInput from './NumberInput';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { validateQuestionAvailability } from '../../lib/supabase';
import { PlayCircle } from 'lucide-react';

interface ExamConfigFormProps {
  onStartExam: (config: ExamConfig) => void;
}

const ExamConfigForm: React.FC<ExamConfigFormProps> = ({ onStartExam }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [maxAvailable, setMaxAvailable] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubjectsChange = (newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    
    // Reset tags when subjects change
    setTags([]);
    
    // Reset validation
    setMaxAvailable(null);
    setValidationError(null);
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    
    // Reset validation
    setMaxAvailable(null);
    setValidationError(null);
  };

  useEffect(() => {
    // Reset validation when any config changes
    setMaxAvailable(null);
    setValidationError(null);
  }, [subjects, tags, numberOfQuestions]);

  const validateConfiguration = async () => {
    if (subjects.length === 0) {
      setValidationError('Please select at least one subject');
      return false;
    }

    if (tags.length === 0) {
      setValidationError('Please select at least one tag');
      return false;
    }

    setIsValidating(true);
    try {
      const { available, maxAvailable } = await validateQuestionAvailability(
        subjects,
        tags,
        numberOfQuestions
      );
      
      setMaxAvailable(maxAvailable);
      
      if (!available) {
        setValidationError(
          `Only ${maxAvailable} questions available. Please reduce the number of questions or select different subjects/tags.`
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError('Failed to validate question availability. Please try again.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateConfiguration();
    if (!isValid) return;
    
    onStartExam({
      subjects,
      tags,
      numberOfQuestions
    });
  };

  return (
    <Card className="max-w-2xl mx-auto transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Configure Your Exam
        </h1>
        
        <SubjectSelector 
          selectedSubjects={subjects} 
          onChange={handleSubjectsChange} 
        />
        
        <TagSelector
          selectedSubjects={subjects}
          selectedTags={tags}
          onChange={handleTagsChange}
        />
        
        <NumberInput
          label="Number of Questions"
          value={numberOfQuestions}
          onChange={setNumberOfQuestions}
          min={1}
          max={maxAvailable || undefined}
          errorMessage={
            maxAvailable !== null && maxAvailable < numberOfQuestions
              ? `Only ${maxAvailable} questions available`
              : undefined
          }
        />
        
        {validationError && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
            {validationError}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isValidating}
            disabled={subjects.length === 0 || tags.length === 0 || isValidating}
            rightIcon={<PlayCircle size={20} />}
          >
            Start Exam
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ExamConfigForm;