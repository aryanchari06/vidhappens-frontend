import React, { useState } from "react";
import { useSelector } from "react-redux";

function Tweets() {
  const tweets = useSelector((state) => state.tweets.tweets);
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const [newTweet, setNewTweet] = useState("");

  console.log(tweets);
  const [showTweetInput, setShowTweetInput] = useState(false);

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
    <div className="mt-8 px-6 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-400">
          {userData.username}'s Tweets
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
    </div>
  );
}

export default Tweets;
