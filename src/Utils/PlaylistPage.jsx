import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

function PlaylistPage() {
  const playlists = useSelector((state) => state.playlists.playlists);
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const authStatus = useSelector((state) => state.auth.authStatus);

  useEffect(() => {
    const selectedPlaylist = playlists.find(
      (playlist) => playlist._id === playlistId
    );
    if (selectedPlaylist) {
      setVideos(selectedPlaylist.playlistVideos);
    }
    // console.log(videos)
  }, [playlists, playlistId]);

  if (!authStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">
          Please log in to access your playlists.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Playlist Videos</h1>
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos in this playlist yet.</p>
        ) : (
          <ul className="space-y-4">
            {videos.map((video) => (
              <li
                key={video._id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-md shadow-md hover:bg-gray-700"
              >
                <div className="flex items-center space-x-4">
                  {/* Thumbnail */}
                  <img
                    src={video.thumbnail || "https://via.placeholder.com/150"}
                    alt={video.title}
                    className="w-24 h-14 object-cover rounded-md"
                  />
                  {/* Video Details */}
                  <div>
                    <Link to={`/video/${video._id}`}>
                      <h2 className="text-lg font-semibold hover:underline">
                        {video.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-400">{video.description}</p>
                  </div>
                </div>
                {/* Video Duration */}
                {/* <span className="text-sm text-gray-400">{video.duration}</span> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PlaylistPage;
