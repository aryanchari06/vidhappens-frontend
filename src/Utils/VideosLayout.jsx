import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Fixed to react-router-dom
import { Videocard } from "./indexUtils";

function VideosLayout({ videos }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!Array.isArray(videos)) {
      setError("Invalid videos data. Please try again later.");
    } else {
      setError(null); // Reset error if videos is valid
    }
  }, [videos]);



  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-semibold text-purple-400">
          No Videos Available
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Check back later or explore other categories!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link
          key={video._id}
          to={`/video/${video._id}`}
          className="bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition-all group"
        >
          <Videocard
            title={video.title}
            duration={video.duration}
            thumbnail={video.thumbnail}
            ownerName={video.videoOwner?.[0]?.username || "Unknown User"}
            ownerAvatar={video.videoOwner?.[0]?.avatar || ""}
            likes={video.likes || 0}
            views={video.views || 0}
          />
        </Link>
      ))}
    </div>
  );
}

export default VideosLayout;
