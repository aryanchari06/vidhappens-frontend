import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSubscriptionData: (state, action) => {
      state.channels = action.payload;
      console.log(state.channels)
    },
    removeSubscriptionData: (state, action) => {
      state.channels = [];
    },
  },
});

export const { setSubscriptionData, removeSubscriptionData } =
  subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
