import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserPlaylists() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userPlaylists = useSelector((state) => state.playlists.playlists);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (authStatus && userPlaylists) {
      setPlaylists(userPlaylists);
    }
  }, [authStatus, userPlaylists]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white min-h-screen px-6 sm:px-12 py-8">
      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-purple-500">
            No Playlists Found
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-md text-center">
            You haven't created any playlists yet. Start organizing your
            favorite videos today!
          </p>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {playlists.map((playlist) => (
              <Link
                key={playlist._id}
                to={`/playlist/${playlist._id}`}
                className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Playlist Thumbnail */}
                <div className="relative">
                  <img
                    src={
                      playlist.playlistVideos[0]?.thumbnail ||
                      "https://images.steelcase.com/image/upload/c_fill,q_auto,f_auto,h_900,w_1600/v1567243086/6130_1000.jpg"
                    }
                    alt={playlist.title}
                    className="w-full h-48 rounded-t-xl object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-3 py-1 rounded-full">
                    {playlist.videos.length} Videos
                  </span>
                </div>
                {/* Playlist Info */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold truncate group-hover:text-purple-400">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 truncate">
                    {playlist.description || "No description provided"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;
