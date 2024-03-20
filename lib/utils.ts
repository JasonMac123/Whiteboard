import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Colours = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function randomColourToId(connectionId: number): string {
  return Colours[connectionId % Colours.length];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
