import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Videocard = ({
  title,
  duration,
  thumbnail,
  ownerName,
  ownerAvatar,
  likes = 0,
  views = 0,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(false);

  const playlists = useSelector((state) => state.playlists.playlists);

  // Function to convert seconds to minutes:seconds format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCardClick = (e) => {
    // Prevent video opening if dropdown is active
    if (isDropdownOpen || isPlaylistsOpen) {
      e.stopPropagation(); // Stop the propagation to prevent opening the video
    }
  };

  return (
    <div
      className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden hover:bg-gray-800 transition-all duration-300 relative"
      onClick={handleCardClick} // Handle card click event to stop propagation
    >
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
      <div className="p-4 relative">
        {/* Title and Options */}
        <div className="flex justify-between items-center relative">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <button
            className="text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation(); // Stop propagation to prevent video opening
              setIsDropdownOpen((prev) => !prev);
            }}
            aria-label="Options"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 top-10 bg-gray-800 text-sm text-gray-200 rounded shadow-lg py-2 w-48 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent propagation here as well
            >
              <div
                className="relative block w-full text-left px-4 py-2 hover:bg-gray-700"
                onMouseEnter={() => setIsPlaylistsOpen(true)}
                onMouseLeave={() => setIsPlaylistsOpen(false)}
              >
                Add to Playlist
                {isPlaylistsOpen && (
                  <div
                    className="absolute top-0 left-full bg-gray-800 text-sm text-gray-200 rounded shadow-lg py-2 w-48 z-50"
                    onMouseEnter={() => setIsPlaylistsOpen(true)}
                    onMouseLeave={() => setIsPlaylistsOpen(false)}
                    onClick={(e) => e.stopPropagation()} // Prevent propagation here as well
                  >
                    {playlists.length ? (
                      playlists.map((playlist) => (
                        <button
                          key={playlist._id}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation(); // Stop propagation
                            console.log(`Added to ${playlist.name}`);
                          }}
                        >
                          {playlist.name}
                        </button>
                      ))
                    ) : (
                      <p className="text-center px-4 py-2 text-gray-400">
                        No playlists found
                      </p>
                    )}
                  </div>
                )}
              </div>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation
                  console.log("Creating new playlist...");
                }}
              >
                Create Playlist
              </button>
            </div>
          )}
        </div>

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
