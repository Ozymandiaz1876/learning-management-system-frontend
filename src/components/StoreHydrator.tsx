"use client";

import { useEffect } from "react";
import { useAppDispatch, store } from "@/app/store"; // Import store
import { loadState, saveState } from "@/lib/utils"; // Import saveState
import { setAuthData } from "@/app/store/authSlice";
import { setTestDetails } from "@/app/store/testSlice";
import { setCurrentQuestion } from "@/app/store/questionSlice";
import { RootState } from "@/app/store";

export function StoreHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Hydration logic
    const loadedState = loadState() as RootState | undefined;
    if (loadedState) {
      if (loadedState.auth) {
        dispatch(setAuthData(loadedState.auth));
      }
      if (loadedState.test) {
        dispatch(setTestDetails(loadedState.test));
      }
      if (loadedState.question) { // Re-enable question hydration
        dispatch(setCurrentQuestion(loadedState.question));
      }
    }

    // Subscription logic
    const unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
      saveState({
        auth: currentState.auth,
        test: currentState.test,
        question: currentState.question,
      });
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch]); // dispatch is a dependency for hydration part

  return null;
}
