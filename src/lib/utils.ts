import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create axios client with baseURL
export const apiClient = axios.create({
  baseURL: "https://bookmyshow-backend-almabetter-g515.onrender.com",
});
