import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import store from "./Store/store.js";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import {
  Home,
  Login,
  Signup,
  UserChannel,
  UserVideos,
  LikedVideos,
  UserPlaylists,
  WatchHistory,
  VideoPlayer,
  PlaylistPage,
  ChannelLayout,
  TweetsPage,
  UploadVideo,
  Settings
} from "./Pages/pagesIndex.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/u/:username",
        element: <UserChannel />,
      },
      {
        path: "/u/:username/videos",
        element: <UserVideos />,
      },
      {
        path: "/u/:username/liked-videos",
        element: <LikedVideos />,
      },
      {
        path: "/u/:username/playlists",
        element: <UserPlaylists />,
      },
      {
        path: "/users/history",
        element: <WatchHistory />,
      },
      {
        path: "/video/:videoId",
        element: <VideoPlayer />,
      },
      {
        path: "/playlist/:playlistId",
        element: <PlaylistPage />,
      },
      {
        path: "/c/:channelUsername",
        element: <ChannelLayout />,
      },
      {
        path: "/u/tweets",
        element: <TweetsPage />,
      },
      {
        path: "/upload",
        element: <UploadVideo />,
      },
      {
        path: "/u/settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
