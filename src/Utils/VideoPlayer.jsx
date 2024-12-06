import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEye,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

function VideoPlayer() {
  const { videoId } = useParams();
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getVideoDetails = async () => {
    try {
      const response = await fetch(`${url}/videos/${videoId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setVideo(result.data[0]);
        console.log(result.data[0]);
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
        // console.log(result.data)
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

  useEffect(() => {
    getVideoDetails();
    getVideoComments();
  }, [videoId]);

  const toggleOptions = () => setShowOptions(!showOptions);

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
          ></video>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">{video.title}</h1>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="text-xl cursor-pointer"
              onClick={toggleOptions}
            />
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md overflow-hidden">
                <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                  Add to Playlist
                </button>
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
          <p className="text-lg">{video.videoOwner[0].username}</p>
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
        </div>
      </div>

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
                    onClick={() => {
                      handleCommentLike(comment._id);
                    }}
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
