import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [],
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
      // console.log("From playlists slice: ", state.playlists);
    },
    resetPlaylists: (state, action) => {
      state.playlists = [];
    },
  },
});

export const {setPlaylists, resetPlaylists} = playlistsSlice.actions

export default playlistsSlice.reducer;
