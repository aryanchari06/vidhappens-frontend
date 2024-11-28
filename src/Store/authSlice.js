import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.userData;
      state.authStatus = true;
    },
    logout: (state, action) => {
      state.userData = null;
      state.authStatus = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
