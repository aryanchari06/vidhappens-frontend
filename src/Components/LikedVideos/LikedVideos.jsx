import React, { useEffect, useState } from "react";
import { VideosLayout } from "../../Utils/indexUtils";

function LikedVideos() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserLikedVideos = async () => {
    setIsLoading(true); // Start loading state
    setError(null); // Clear any previous errors
    try {
      const response = await fetch(`${url}/likes/videos`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("API Response:", result); // Log full API response
        if (result && Array.isArray(result.data)) {
          const videos = result.data;
          const liked = videos.map((video) => video.likedVideos[0]);
          setLikedVideos(liked);
          console.log("Videos set:", result.data); // Log the actual videos
        } else {
          setError("Invalid response format: Data is not an array.");
          console.error("Invalid data:", result.data);
        }
      } else {
        const errorText = `Error: ${response.status} ${response.statusText}`;
        setError(errorText);
        console.error(errorText);
      }
    } catch (error) {
      setError("Error during API call: " + error.message);
      console.error("API Call Error:", error.message);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  useEffect(() => {
    getUserLikedVideos();
  }, []);

  useEffect(() => {
    console.log("Liked Videos updated:", likedVideos); // Log state changes
  }, [likedVideos]);

  return (
    <div className="bg-gray-950 text-white min-h-screen p-8">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl text-purple-400 font-bold">Loading...</h1>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-semibold text-red-500">Error</h1>
          <p className="text-gray-400 mt-4 text-lg">{error}</p>
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
