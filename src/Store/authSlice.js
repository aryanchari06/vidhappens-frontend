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
      state.userData = action.payload;
      state.authStatus = true;
      console.log("User data in store: ",state.userData)
    },
    logout: (state, action) => {
      state.userData = null;
      state.authStatus = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
