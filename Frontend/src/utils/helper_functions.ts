import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateDuration = (date: Date) => {
  const now: Date = new Date(Date.now());
  const durationInMilliseconds = Math.abs(now.getTime() - date.getTime());
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  if (durationInDays >= 7) {
    return date.toISOString().split('T')[0];
  } else if (durationInDays > 0) {
    return `${durationInDays} day${durationInDays > 1 ? 's' : ''} ago`;
  } else if (durationInHours > 0) {
    return `${durationInHours} hr${durationInHours > 1 ? 's.' : ''} ago`;
  } else if (durationInMinutes > 0) {
    return `${durationInMinutes} min${durationInMinutes > 1 ? 's.' : ''} ago`;
  } else {
    return `${durationInSeconds} sec${durationInSeconds > 1 ? 's.' : ''} ago`;
  }
};
