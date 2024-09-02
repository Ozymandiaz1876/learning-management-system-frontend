import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface options {
  text: string;
  isCorrect?: boolean;
}

interface questions {
  id: string;
  questionText: string;
  difficulty: number;
  options: options[];
}

interface TestState {
  id: string | null;
  questions: questions[];
  currentQuestionIndex: number;
  score: number;
}

const initialState: TestState = {
  id: null,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    startTest: (
      state,
      action: PayloadAction<{ id: string; questions: any[] }>
    ) => {
      state.id = action.payload.id;
      state.questions = action.payload.questions;
      state.currentQuestionIndex = 0;
      state.score = 0;
    },
    answerQuestion: (state, action: PayloadAction<{ isCorrect: boolean }>) => {
      if (action.payload.isCorrect) {
        state.score += 1;
      }
      state.currentQuestionIndex += 1;
    },
    resetTest: (state) => {
      state.id = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
    },
  },
});

export const { startTest, answerQuestion, resetTest } = testSlice.actions;
export default testSlice.reducer;
