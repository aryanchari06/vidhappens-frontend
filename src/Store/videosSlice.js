import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userVideos: [],
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.userVideos = action.payload;
      // console.log("From video slice",state.userVideos);
    },
    resetVideos: (state, action) => {
      state.userVideos = [];
    },
  },
});

export const { setVideos, resetVideos } = videosSlice.actions;

export default videosSlice.reducer;
