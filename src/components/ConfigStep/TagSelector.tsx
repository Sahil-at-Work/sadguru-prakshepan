import React, { useEffect, useState } from 'react';
import { Tag } from 'lucide-react';
import { fetchSubjectTags } from '../../lib/supabase';
import { Subject } from '../../types';

interface TagSelectorProps {
  selectedSubjects: Subject[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedSubjects,
  selectedTags,
  onChange,
}) => {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSubjects.length === 0) {
      setAvailableTags([]);
      return;
    }

    const loadTags = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tags = await fetchSubjectTags(selectedSubjects);
        setAvailableTags(tags);
        
        // Remove any previously selected tags that are no longer available
        const validSelectedTags = selectedTags.filter(tag => tags.includes(tag));
        if (validSelectedTags.length !== selectedTags.length) {
          onChange(validSelectedTags);
        }
      } catch (err) {
        setError('Failed to load tags. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTags();
  }, [selectedSubjects, selectedTags, onChange]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  if (selectedSubjects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Select Tags
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please select at least one subject to see available tags.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Select Tags
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : availableTags.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No tags available for the selected subjects.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`flex items-center px-3 py-1.5 rounded-full border transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                }`}
                onClick={() => toggleTag(tag)}
                type="button"
              >
                <Tag size={16} className="mr-1.5" />
                {tag}
              </button>
            ))}
          </div>
          
          {selectedTags.length === 0 && (
            <p className="text-sm text-red-500">
              Please select at least one tag
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TagSelector;