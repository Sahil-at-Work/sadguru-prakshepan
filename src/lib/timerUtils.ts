import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';

export function calculateExamDuration(numberOfQuestions: number): number {
  // Duration in seconds
  if (numberOfQuestions <= 10) {
    return 30 * 60; // 30 minutes
  } else if (numberOfQuestions <= 30) {
    return 60 * 60; // 1 hour
  } else if (numberOfQuestions <= 50) {
    return 90 * 60; // 1.5 hours
  } else {
    return 120 * 60; // 2 hours
  }
}

export function formatTime(seconds: number): string {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  return formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] });
}

export function formatTimeSpent(startTime: Date, endTime: Date): string {
  const seconds = differenceInSeconds(endTime, startTime);
  return formatTime(seconds);
}