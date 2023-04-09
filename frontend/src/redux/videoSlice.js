import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentHistory: null,
  word: null,
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    reloadVideo: (state) => {
      state.currentVideo = null;
      state.loading = false;
      state.error = false;
    },
    historyVideo: (state, action) => {
      state.currentHistory = action.payload;
    },
    videoWords: (state, action) => {
      state.word = action.payload;
    },
    reloadHistory: (state) => {
      state.currentHistory = null;
    },
  },
});

export const {
  fetchStart,
  reloadVideo,
  fetchSuccess,
  fetchFailure,
  historyVideo,
  reloadHistory,
  videoWords,
} = videoSlice.actions;

export default videoSlice.reducer;
