import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getApiUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `/api${path}`;
  }
  const baseUrl = localStorage.getItem('apiBaseUrl');
  if (baseUrl) {
    // Ensure no double slashes
    return `${baseUrl.replace(/\/$/, '')}${path}`;
  }
  return `/api${path}`;
};
