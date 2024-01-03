import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getValues = <T extends Record<string, string>>(obj: T) => {
  return Object.values(obj) as [(typeof obj)[keyof T]];
};
