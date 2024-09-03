import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTimeString(timeString: string) {
	const hours = timeString.slice(0, 2);
	const minutes = timeString.slice(2, 4);
	const seconds = timeString.slice(4, 6);

	return `${hours}:${minutes}:${seconds}`;
}
