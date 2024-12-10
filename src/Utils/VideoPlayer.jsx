import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEye,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { DeleteVideoModal } from "./indexUtils";

function VideoPlayer() {
  const userData = useSelector((state) => state.auth.userData);
  const [isUserVideo, setIsUserVideo] = useState(false);
  const { videoId } = useParams();
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const playlists = useSelector((state) => state.playlists.playlists);
  const [showPlaylists, setShowPlaylists] = useState(false);

  const getVideoDetails = async () => {
    try {
      const response = await fetch(`${url}/videos/${videoId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setVideo(result.data[0]);
      } else {
        console.error("Error fetching video details");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const getVideoComments = async () => {
    try {
      const response = await fetch(`${url}/comments/${videoId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setComments(result.data);
      } else {
        console.error("Error fetching video comments");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(`${url}/comments/${videoId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      if (response.ok) {
        setNewComment("");
        getVideoComments(); // Refresh comments
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleVideoLike = async (videoId) => {
    try {
      const response = await fetch(`${url}/likes/toggle/v/${videoId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Error during video like toggle");
      }
    } catch (error) {
      console.log("Error during API Call: ", error);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const response = await fetch(`${url}/likes/toggle/c/${commentId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Error during video like toggle");
      }
    } catch (error) {
      console.log("Error during API Call: ", error);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const response = await fetch(
        `${url}/playlist/add/${videoId}/${playlistId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Error while adding video to playlist");
      }
    } catch (error) {
      console.log("Error during api call: ", error);
    }
  };

  const handleDelete = async ({ videoId }) => {
    deleteVideo(videoId);
    deleteLikeDocument(videoId);
  };
  const deleteVideo = async (videoId) => {
    try {
      const response = await fetch(`${url}/videos/${videoId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Error while deleting video");
      }
    } catch (error) {
      console.log("Error during api call: ", error);
    }
  };
  const deleteLikeDocument = async (videoId) => {
    try {
      const response = await fetch(`${url}/likes/delete-doc/${videoId}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Error while deleting the like document");
      }
    } catch (error) {
      console.log("Error during API call: ", error);
    }
  };

  useEffect(() => {
    getVideoDetails();
    getVideoComments();
  }, [videoId]);

  useEffect(() => {
    if (video) {
      if (video.owner === userData._id) setIsUserVideo(true);
    }
  }, [video]);

  const togglePlaylists = () => {
    setShowPlaylists(!showPlaylists);
  };

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Loading Video...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Video Section */}
      <div className="container mx-auto">
        <div className="aspect-w-16 aspect-h-9 bg-black mb-6">
          <video
            src={video.videoFile}
            controls
            className="w-[120vw] h-[67.5vh]"
            style={{
              accentColor: "#9b5de5", // Purple for buttons, aligns with your theme
            }}
          ></video>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">{video.title}</h1>
            <p className="text-gray-400">{video.description}</p>
          </div>
          <div className="relative" onClick={togglePlaylists}>
            <button className="text-gray-300 flex items-center space-x-2 hover:bg-gray-700 px-4 py-2">
              <span>Add to Playlist</span>
              {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
            </button>
            {showPlaylists && (
              <div className="absolute right-0 mt-2 flex flex-col space-y-2 bg-gray-800 shadow-lg rounded-md p-2">
                {playlists.map((playlist) => (
                  <button
                    key={playlist._id}
                    className="text-gray-300 hover:bg-gray-700 px-4 py-2"
                    onClick={() => {
                      handleAddToPlaylist(playlist._id);
                    }}
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <img
            src={video.videoOwner[0].avatar || "https://via.placeholder.com/50"}
            alt={video.videoOwner[0].username}
            className="w-12 h-12 rounded-full"
          />
          <Link to={`/c/${video.videoOwner[0].username}`} className="text-lg">
            {video.videoOwner[0].username}
          </Link>
        </div>
        <div className="flex items-center space-x-6 mt-4 text-gray-400">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEye} />
            <span>{video.views} Views</span>
          </div>
          <button
            className="flex items-center space-x-2"
            onClick={() => {
              handleVideoLike(video._id);
            }}
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={video.isLiked ? "text-purple-500" : "text-gray-400"}
            />
            <span>{video.videoLikesCount} Likes</span>
          </button>
          <button
            className={`${
              isUserVideo ? "block" : "hidden"
            } bg-red-600 text-white px-4 py-2 rounded-md`}
            onClick={openModal}
          >
            Delete video
          </button>
        </div>
      </div>

      <DeleteVideoModal
        handleDelete={() => handleDelete(video._id)}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />

      {/* Comments Section */}
      <div className="container mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 text-white rounded-sm focus:outline-none bg-transparent border-b border-b-gray-700 focus:border-b-white "
          />
          <button
            onClick={addComment}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Comment
          </button>
        </div>
        {comments.length === 0 ? (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <ul className="space-y-6">
            {comments.map((comment) => (
              <li key={comment._id}>
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      comment.commentOwner[0].avatar ||
                      "https://via.placeholder.com/50"
                    }
                    alt={comment.commentOwner[0].username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm text-gray-400">
                      {comment.commentOwner[0].username}
                    </p>
                    <p className="text-md font-semibold">{comment.content}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-gray-400">
                  <button
                    onClick={() => handleCommentLike(comment._id)}
                    className="flex items-center space-x-1"
                  >
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={
                        comment.hasUserLikedComment
                          ? "text-purple-500"
                          : "text-gray-400"
                      }
                    />
                    <span>{comment.commentLikesCount}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
