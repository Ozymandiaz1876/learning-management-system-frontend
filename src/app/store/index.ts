import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import testReducer from "./testSlice";
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";
import { saveState } from "../../lib/utils";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
    question: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
