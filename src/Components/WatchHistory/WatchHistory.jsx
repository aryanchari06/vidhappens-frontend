import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WatchHistory() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const [history, setHistory] = useState([]);

  const getUserWatchHistory = async () => {
    try {
      const response = await fetch(`${url}/users/history`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setHistory(result.data);
      } else {
        console.log("Error while fetching watch history");
      }
    } catch (error) {
      console.log("Error during API call:", error);
    }
  };

  useEffect(() => {
    if (authStatus && userData) {
      getUserWatchHistory();
    }
  }, [authStatus, userData]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white min-h-screen px-6 sm:px-12 py-8">
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-purple-500">
            No Watch History Found
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-md text-center">
            Start watching videos to see your watch history here.
          </p>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold text-purple-400 mb-8">
            Watch History
          </h1>
          <ul className="space-y-6">
            {history.map((video) => (
              <li
                key={video._id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Thumbnail */}
                  <Link
                    to={`/video/${video._id}`}
                    className="w-32 h-20 flex-shrink-0"
                  >
                    <img
                      src={video.thumbnail || "https://via.placeholder.com/150"}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>

                  {/* Video Info */}
                  <div className="flex-1">
                    <Link to={`/video/${video._id}`}>
                      <h3 className="text-lg font-semibold truncate text-white group-hover:text-purple-400">
                        {video.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mt-2">
                      {video.description || "No description available"}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Watched on: {video.createdAt.slice(0, 10)}
                    </div>
                  </div>

                  {/* Video Owner */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={video.owner.avatar || "https://via.placeholder.com/50"}
                      alt={video.owner.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-sm text-gray-400">
                      {video.owner.username || "Unknown User"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WatchHistory;
