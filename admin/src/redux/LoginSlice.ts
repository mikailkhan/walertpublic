import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  value: boolean | null;
  loading: boolean;
}

const initialState: LoginState = {
  value: null,
  loading: true,
};

export const loginSlice = createSlice({
  name: "userLogStatus",
  initialState,
  reducers: {
    checking: (state) => {
      state.loading = true;
    },

    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
      state.loading = false;
    },

    logout: (state) => {
      state.value = false;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checking } = loginSlice.actions;

export default loginSlice.reducer;
