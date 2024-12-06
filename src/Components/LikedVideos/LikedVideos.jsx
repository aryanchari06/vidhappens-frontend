import React, { useEffect, useState } from "react";
import { VideosLayout } from "../../Utils/indexUtils";

function LikedVideos() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [likedVideos, setLikedVideos] = useState([]);

  const getUserLikedVideos = async () => {
    try {
      const response = await fetch(`${url}/likes/videos`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        const videos = result.data;
        setLikedVideos(videos);
      } else {
        console.error("Error while fetching liked videos");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    getUserLikedVideos();
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen p-8">
      {likedVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
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
