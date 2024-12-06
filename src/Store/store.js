import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import subscriptionsSlice from "./subscriptionsSlice";
import statsSlice from "./statsSlice";
import videosSlice from "./videosSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    subscriptions: subscriptionsSlice,
    stats: statsSlice,
    videos: videosSlice,
  },
});

export default store;
