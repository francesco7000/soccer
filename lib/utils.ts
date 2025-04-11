import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }

  // Capitalize first letter
  const formatted = date.toLocaleDateString("it-IT", options)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
