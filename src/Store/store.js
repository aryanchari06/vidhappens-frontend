import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import subscriptionsSlice from './subscriptionsSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    subscriptions: subscriptionsSlice
  },
});

export default store;
