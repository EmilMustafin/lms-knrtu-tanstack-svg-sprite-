import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - Class Name
 * Merges multiple class names into a single string using tailwind-merge and clsx.
 *
 * @param classNames - The class names to merge.
 * @returns The merged class names as a string.
 */
export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
