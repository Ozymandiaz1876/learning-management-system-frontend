import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
