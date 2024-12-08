import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweets: [],
};

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.tweets = action.payload;
      // console.log("From tweets Slice: ", state.tweets);
    },
    clearTweets: (state, action) => {
      state.tweets = [];
    },
  },
});

export const { setTweets, clearTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;
