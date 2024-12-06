import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelStats: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.channelStats = action.payload;
      console.log("from slice: ", state.channelStats);
    },
    removeStats: (state, action) => {
      state.channelStats = [];
    },
  },
});

export const { setStats, removeStats } = statsSlice.actions;
export default statsSlice.reducer;
