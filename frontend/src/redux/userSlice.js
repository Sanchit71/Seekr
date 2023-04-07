import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  hover: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailer: (state) => {
      state.loading = false;
      state.error = true;
    },
    hover: (state, action) => {
      state.hover = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  subscription,
  loginFailer,
  loginSuccess,
  logout,
  hover,
} = userSlice.actions;

export default userSlice.reducer;
