import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import subscriptionsSlice from "./subscriptionsSlice";
import statsSlice from "./statsSlice";
import videosSlice from "./videosSlice";
import playlistsSlice from "./playlistsSlice";
import tweetsSlice from "./tweetsSlice";
import queryVideosSlice from "./queryVideosSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    subscriptions: subscriptionsSlice,
    stats: statsSlice,
    videos: videosSlice,
    playlists: playlistsSlice,
    tweets: tweetsSlice,
    queryVideos: queryVideosSlice,
  },
});

export default store;
