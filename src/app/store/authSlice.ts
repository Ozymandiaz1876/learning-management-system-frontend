import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

interface AuthState {
  token: string | null;
  tokenExpires: number | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  tokenExpires: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.tokenExpires = action.payload.tokenExpires;
      state.user = action.payload.user;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.tokenExpires = null;
      state.user = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
