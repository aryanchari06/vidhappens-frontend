import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const queryVideosSlice = createSlice({
  name: "queryVideos",
  initialState,
  reducers: {
    setQueryVideos: (state, action) => {
      state.videos = action.payload;
      console.log("From querySlice: ", state.videos);
    },
    clearQueryVideos: (state, action) => {
      state.videos = [];
    },
  },
});

export const { setQueryVideos, clearQueryVideos } = queryVideosSlice.actions;

export default queryVideosSlice.reducer;
