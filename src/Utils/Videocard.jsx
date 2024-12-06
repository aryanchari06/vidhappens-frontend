import React from "react";
import PropTypes from "prop-types";

const Videocard = ({
  title,
  duration,
  thumbnail,
  ownerName,
  ownerAvatar,
  likes = 0,
  views = 0,
}) => {
  // Function to convert seconds to minutes:seconds format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`; // Ensures seconds are always two digits
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden hover:bg-gray-800 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-sm text-white px-2 py-1 rounded">
          {formatDuration(duration)}
        </span>
      </div>
  
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold truncate">{title}</h3>
  
        {/* Owner Info */}
        <div className="flex items-center gap-3 mt-3">
          <img
            src={ownerAvatar}
            alt={ownerName}
            className="w-10 h-10 rounded-full border border-gray-700 object-cover"
          />
          <p className="text-sm text-gray-400">{ownerName}</p>
        </div>
  
        {/* Stats */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-400">
            <i className="fa-solid fa-thumbs-up"></i>
            <p className="text-sm">{likes} Likes</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <i className="fa-solid fa-eye"></i>
            <p className="text-sm">{views} Views</p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

// Prop Types for Validation
Videocard.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired, // Duration is expected as seconds (number)
  thumbnail: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerAvatar: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
};

export default Videocard;
