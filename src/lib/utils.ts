// @ts-expect-error
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line id-length
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
