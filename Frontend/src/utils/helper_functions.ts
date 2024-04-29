import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const dateDuration = (date: Date) => {
  const now: Date = new Date(Date.now());
  const durationInMilliseconds = Math.abs(now.getTime() - date.getTime());
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);
  const durationInMonths = Math.floor(durationInDays / 30);
  const durationInYears = Math.floor(durationInMonths / 12);

  if (durationInYears > 0) {
    return `${durationInYears} year${durationInYears > 1 ? 's' : ''} ago`;
  } else if (durationInMonths > 0) {
    return `${durationInMonths} month${durationInMonths > 1 ? 's' : ''} ago`;
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

export function getTimeDifference(date: string) {
  const currentTime = moment();
  const srcTime = moment(date);
  const duration = moment.duration(currentTime.diff(srcTime));

  if (duration.asYears() >= 1) {
    return `${Math.floor(duration.asYears())}y`;
  } else if (duration.asMonths() >= 1) {
    return `${Math.floor(duration.asMonths())}M`;
  } else if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())}d`;
  } else if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())}h`;
  } else if (duration.asMinutes() >= 1) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else {
    return 'Less than a minute';
  }
}

export function getTimeDifferenceAsString(date: Date) {
  const momDate = moment(date);
  return momDate.fromNow();
}

export function addPrefixToUsername(
  username: string,
  userType: 'moderator' | 'community' | 'user'
) {
  console.log(username, userType);
  if (!username) return null;
  if (userType == 'moderator' || userType == 'community') {
    return 'r/' + username;
  } else if (userType == 'user') {
    return 'u/' + username;
  } else {
    return null;
  }
}

export function formatNumber(number: number) {
  const units = ['', 'K', 'M', 'B', 'T'];
  const unitIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
  const formattedNumber = (number / Math.pow(1000, unitIndex)).toFixed(1);
  return formattedNumber + units[unitIndex];
}
