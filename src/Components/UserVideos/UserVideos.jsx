import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VideosLayout } from "../../Utils/indexUtils";

function UserVideos() {
  const videos = useSelector((state) => state.videos.userVideos);
  console.log(videos)
  const userData = useSelector((state) => state.auth.userData);

  // Fallback UI for when userData is null or undefined
  if (!userData) {
    return (
      <div className="bg-gray-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-400">
            User data unavailable
          </h1>
          <p className="text-gray-400 mt-2">
            Please log in to view your videos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white py-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400">
          {userData.username}'s Videos
        </h1>
        <p className="text-gray-400">Browse and manage your uploaded videos.</p>
      </div>

      {/* Videos Grid */}
      <div className="px-10">
        <VideosLayout videos={videos} />
      </div>

      {/* No Videos Fallback */}
      {videos.length === 0 && (
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-400">
            No videos found!
          </h2>
          <p className="text-gray-500 mt-2">
            Upload your first video to start building your channel.
          </p>
        </div>
      )}
    </div>
  );
}

export default UserVideos;
