import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ISSERVER = typeof window === "undefined";

export const loadState = () => {
  if (ISSERVER) {
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    return {
      auth: parsedState,
    };
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  if (ISSERVER) {
    return undefined;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage:", err);
  }
};
