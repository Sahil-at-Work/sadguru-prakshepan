import { createClient } from '@supabase/supabase-js';
import { Subject, Question } from '../types';

// These would typically come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchSubjectTags(subjects: Subject[]): Promise<string[]> {
  if (!subjects.length) return [];

  try {
    const tags: string[] = [];
    for (const subject of subjects) {
      const { data, error } = await supabase
        .from(subject)
        .select('tags')
        .throwOnError();

      if (error) throw error;

      // Extract unique tags from all questions
      if (data) {
        const subjectTags = data.flatMap(item => item.tags);
        tags.push(...subjectTags);
      }
    }
    
    // Return unique tags
    return [...new Set(tags)];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function fetchQuestionsByConfig(
  subjects: Subject[],
  tags: string[],
  numberOfQuestions: number
): Promise<Question[]> {
  if (!subjects.length) return [];

  try {
    const allQuestions: Question[] = [];

    // For each selected subject, fetch all matching questions
    for (const subject of subjects) {
      const { data, error } = await supabase
        .from(subject)
        .select('*')
        .containedBy('tags', tags)
        .throwOnError();

      if (error) throw error;

      if (data) {
        // Add subject information to each question
        const questionsWithSubject = data.map(q => ({
          ...q,
          subject
        }));
        allQuestions.push(...questionsWithSubject);
      }
    }

    // Shuffle all questions from all subjects together
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

    // Take only the required number of questions
    return shuffledQuestions.slice(0, numberOfQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

export async function validateQuestionAvailability(
  subjects: Subject[],
  tags: string[],
  numberOfQuestions: number
): Promise<{ available: boolean; maxAvailable: number }> {
  try {
    let totalAvailable = 0;

    for (const subject of subjects) {
      const { count, error } = await supabase
        .from(subject)
        .select('*', { count: 'exact', head: true })
        .containedBy('tags', tags);

      if (error) throw error;
      
      totalAvailable += count || 0;
    }

    return {
      available: totalAvailable >= numberOfQuestions,
      maxAvailable: totalAvailable
    };
  } catch (error) {
    console.error('Error validating question availability:', error);
    return { available: false, maxAvailable: 0 };
  }
}