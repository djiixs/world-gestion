import { type ClassValue, clsx } from "clsx";

/** Merge Tailwind classes safely (thin wrapper, no twMerge dependency needed for now) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
