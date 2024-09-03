import { RootState } from "@/app/store";
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
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    return {
      auth: parsedState.auth,
      test: parsedState.test,
    };
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  if (ISSERVER) {
    return undefined;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage:", err);
  }
};

export const isAuthenticated = (state: RootState["auth"]): boolean => {
  const { token, tokenExpires } = state;

  if (!token || !tokenExpires) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  return tokenExpires > currentTime;
};
