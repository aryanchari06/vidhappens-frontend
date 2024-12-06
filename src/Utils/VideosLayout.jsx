import React from "react";
import { Link } from "react-router";
import { Videocard } from "./indexUtils";
import { useSelector } from "react-redux";

function VideosLayout({ videos }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
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
            ownerName={video.videoOwner[0].username}
            ownerAvatar={video.videoOwner[0].avatar}
            likes={video.likes || 0}
            views={video.views || 0}
          />
        </Link>
      ))}
    </div>
  );
  
}

export default VideosLayout;
