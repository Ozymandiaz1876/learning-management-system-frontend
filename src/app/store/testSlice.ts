import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TestState {
  uniqueURLId: string | null;
  testId: string | null;
  title: string;
  description: string;
}

const initialState: TestState = {
  uniqueURLId: null,
  testId: null,
  title: "",
  description: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTestDetails: (state, action: PayloadAction<TestState>) => {
      const { uniqueURLId, testId, title, description } = action.payload;
      state.uniqueURLId = uniqueURLId;
      state.testId = testId;
      state.title = title;
      state.description = description;
    },
    clearTestDetails: (state) => {
      state.uniqueURLId = null;
      state.testId = null;
      state.title = "";
      state.description = "";
    },
  },
});

export const { setTestDetails, clearTestDetails } = testSlice.actions;

export default testSlice.reducer;
