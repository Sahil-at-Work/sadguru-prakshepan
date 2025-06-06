import React from 'react';
import { BookOpen, Atom, FlaskConical, Pi } from 'lucide-react';
import { Subject } from '../../types';

interface SubjectOption {
  value: Subject;
  label: string;
  icon: React.ReactNode;
}

interface SubjectSelectorProps {
  selectedSubjects: Subject[];
  onChange: (subjects: Subject[]) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  selectedSubjects, 
  onChange 
}) => {
  const subjects: SubjectOption[] = [
    { value: 'physics', label: 'Physics', icon: <Atom size={24} /> },
    { value: 'chemistry', label: 'Chemistry', icon: <FlaskConical size={24} /> },
    { value: 'mathematics', label: 'Mathematics', icon: <Pi size={24} /> },
    { value: 'biology', label: 'Biology', icon: <BookOpen size={24} /> },
  ];

  const toggleSubject = (subject: Subject) => {
    if (selectedSubjects.includes(subject)) {
      onChange(selectedSubjects.filter(s => s !== subject));
    } else {
      onChange([...selectedSubjects, subject]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Select Subjects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.value}
            className={`flex items-center p-4 rounded-lg border-2 transition-all ${
              selectedSubjects.includes(subject.value)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
            onClick={() => toggleSubject(subject.value)}
            type="button"
          >
            <div className={`mr-3 p-2 rounded-full ${
              selectedSubjects.includes(subject.value)
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              {subject.icon}
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {subject.label}
            </span>
          </button>
        ))}
      </div>
      {selectedSubjects.length === 0 && (
        <p className="text-sm text-red-500 mt-2">
          Please select at least one subject
        </p>
      )}
    </div>
  );
};

export default SubjectSelector;