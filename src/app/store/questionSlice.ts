import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface question {
  id: string;
  questionText: string;
  options: string[];
  difficulty: number;
}

interface QuestionState {
  currentQuestion: question | null;
}

const initialState: QuestionState = {
  currentQuestion: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.currentQuestion = action.payload.currentQuestion;
    },
    clearCurrentQuestion: (state) => {
      state.currentQuestion = null;
    },
  },
});

export const { setCurrentQuestion, clearCurrentQuestion } =
  questionSlice.actions;

export default questionSlice.reducer;
