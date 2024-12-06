import React, { useEffect, useState } from "react";
import { VideosLayout } from "../../Utils/indexUtils";

function LikedVideos() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const getUserLikedVideos = async () => {
    setIsLoading(true);
    setError(null); // Reset error before making a new request
    try {
      const response = await fetch(`${url}/likes/videos`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setLikedVideos(result.data || []);
      } else {
        const errorText = `Error: ${response.status} ${response.statusText}`;
        setError(errorText);
        console.error(errorText);
      }
    } catch (error) {
      const errorMessage = "Error during API call: " + error.message;
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  useEffect(() => {
    getUserLikedVideos();
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen p-8">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl text-purple-400 font-bold">Loading...</h1>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
          <p className="text-gray-400 mt-4">{error}</p>
          <button
            onClick={getUserLikedVideos}
            className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      ) : likedVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-semibold text-purple-400">
            You have not liked any videos
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Like some videos to see them here.
          </p>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-purple-400 mb-6">
            Your Liked Videos
          </h1>
          <VideosLayout videos={likedVideos} />
        </div>
      )}
    </div>
  );
}

export default LikedVideos;
