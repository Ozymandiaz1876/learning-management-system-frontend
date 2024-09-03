import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueURLId: null,
  testId: null,
  title: "",
  description: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTestDetails: (state, action) => {
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
