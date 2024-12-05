import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import subscriptionsSlice from './subscriptionsSlice'
import statsSlice from './statsSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    subscriptions: subscriptionsSlice,
    stats: statsSlice
  },
});

export default store;
