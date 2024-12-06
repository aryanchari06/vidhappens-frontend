import React from "react";
import { UserPlaylists as PlaylistsComponent } from "../Components/index";
import { useSelector } from "react-redux";
import AuthBtns from "../Utils/AuthBtns";

function UserPlaylists() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      {authStatus ? (
        <div className="w-full max-w-6xl ">
          <PlaylistsComponent />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-300">
            Please log in to browse your playlists
          </h2>
          <AuthBtns />
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;
