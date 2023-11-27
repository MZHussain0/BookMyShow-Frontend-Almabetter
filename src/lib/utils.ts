import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create axios client with baseURL
const apiUrl = import.meta.env.VITE_API_URL;
export const apiClient = axios.create({
  baseURL: apiUrl,
});
