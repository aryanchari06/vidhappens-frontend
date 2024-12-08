import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserChannel = ({ user }) => {
  const {
    avatar,
    coverImage = "https://images.steelcase.com/image/upload/c_fill,q_auto,f_auto,h_900,w_1600/v1567243086/6130_1000.jpg",
    username,
    fullname,
    totalSubscribers = 0,
    totalViews = 0,
    totalLikesCount = 0,
    totalVideosCount,
  } = user;

  const [newTweet, setNewTweet] = useState("");
  const [showTweetInput, setShowTweetInput] = useState(false);
  const authStatus = useSelector((state) => state.auth.authStatus);
  const tweets = useSelector((state) => state.tweets.tweets);
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const handleTweetChange = (e) => setNewTweet(e.target.value);

  const toggleTweetInput = () => setShowTweetInput((prev) => !prev);

  const handleCreateTweet = async () => {
    if (!newTweet.trim()) {
      alert("Tweet content cannot be empty.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/tweets/`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newTweet }),
        }
      );
      if (response.ok) {
        setNewTweet("");
        setShowTweetInput(false);
      } else {
        console.error("Error creating tweet");
      }
    } catch (error) {
      console.error("Error during API call: ", error);
    }
  };

  const handleTweetLike = async (tweetId) => {
    try {
      const response = await fetch(`${url}/likes/toggle/t/${tweetId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error("Error toggling tweet like.");
      }
    } catch (error) {
      console.error("Error during API call: ", error);
    }
  };

  return (
    <div className="bg-gray-950 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:shadow-2xl">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-48 object-cover brightness-75"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.steelcase.com/image/upload/c_fill,q_auto,f_auto,h_900,w_1600/v1567243086/6130_1000.jpg";
          }}
        />
        {/* Avatar */}
        <div className="absolute inset-x-0 -bottom-16 flex justify-center">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-950 shadow-lg transform transition-transform hover:scale-110"
          />
        </div>
      </div>

      {/* User Details */}
      <div className="mt-16 px-6 pb-6 text-center">
        <h1 className="text-2xl font-extrabold text-purple-400 hover:underline">
          {fullname}
        </h1>
        <h2 className="text-lg text-gray-400">@{username}</h2>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-4 gap-6">
          <div className="group">
            <h3 className="text-2xl font-bold text-purple-400 group-hover:text-white transition-colors">
              {totalSubscribers}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              Subscribers
            </p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold text-purple-400 group-hover:text-white transition-colors">
              {totalViews}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              Total Views
            </p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold text-purple-400 group-hover:text-white transition-colors">
              {totalLikesCount}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              Total Likes
            </p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold text-purple-400 group-hover:text-white transition-colors">
              {totalVideosCount}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              Total Videos
            </p>
          </div>
        </div>
      </div>

      {/* User Tweets Section */}
      {/* <div className="mt-8 px-6 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-400">
            {username}'s Tweets
          </h2>
          {authStatus && (
            <button
              onClick={toggleTweetInput}
              className={`bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 ${
                showTweetInput ? "hidden" : ""
              }`}
            >
              {showTweetInput ? "Cancel" : "Create Tweet"}
            </button>
          )}
        </div>
        {showTweetInput && (
          <div className="mb-6 flex items-center justify-center gap-1">
            <input
              type="text"
              value={newTweet}
              onChange={handleTweetChange}
              placeholder="Write your tweet here..."
              className="w-full px-4 py-2 text-white rounded-sm bg-transparent outline-none border-b border-b-gray-900 focus:border-b-purple-600 mr-6 "
            />
            <button
              onClick={handleCreateTweet}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 mr-1"
            >
              Submit
            </button>
            <button
              onClick={toggleTweetInput}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
        {authStatus ? (
          tweets && tweets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tweets.map((tweet) => (
                <div
                  key={tweet._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={
                        tweet.tweetOwner[0].avatar ||
                        "https://via.placeholder.com/50"
                      }
                      alt={tweet.tweetOwner[0].username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-bold">
                        {tweet.tweetOwner[0].fullname}
                      </p>
                      <p className="text-sm text-gray-400">
                        @{tweet.tweetOwner[0].username}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{tweet.content}</p>
                  <div className="flex items-center space-x-6 text-gray-400">
                    <button
                      className="flex items-center space-x-2"
                      onClick={() => handleTweetLike(tweet._id)}
                    >
                      <span className="text-purple-600">
                        {tweet.hasUserLikedTweet ? (
                          <i className="fa-solid fa-heart"></i>
                        ) : (
                          <i className="fa-regular fa-heart"></i>
                        )}
                      </span>
                      <span>{tweet.tweetLikesCount}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No tweets available for this user.</p>
          )
        ) : (
          <p className="text-gray-400">Please log in to view tweets.</p>
        )}
      </div> */}
    </div>
  );
};

export default UserChannel;
