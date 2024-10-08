import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import testReducer from "./testSlice";
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";
import { ISSERVER, loadState, saveState } from "../../lib/utils";

const preloadedState = ISSERVER ? undefined : loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
    question: questionReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state: RootState = store.getState();
  saveState({
    auth: state.auth,
    test: state.test,
    question: state.question,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
