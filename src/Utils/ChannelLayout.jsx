import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Videocard, VideosLayout } from "../Utils/indexUtils";

function ChannelLayout({ isUserChannel }) {
  const { channelUsername } = useParams();
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const [channel, setChannel] = useState(null);
  const [selectedTab, setSelectedTab] = useState("videos");
  const [playlists, setPlaylists] = useState([]);
  const [tweets, setTweets] = useState([]);

  const subscribedChannels = useSelector(
    (state) => state.subscriptions.channels
  );

  // console.log("subscribed channels: ", subscribedChannels)
  const [subscribed, setSubscribed] = useState(false);

  const authStatus = useSelector((state) => state.auth.authStatus);

  const getChannel = async () => {
    try {
      const response = await fetch(`${url}/users/c/${channelUsername}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.data);
        setChannel(result.data);
      } else {
        console.log(
          "Error fetching user: ",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log("Error during api call: ", error);
    }
  };

  useEffect(() => {
    if (channel && subscribedChannels) {
      const isSubscribed = subscribedChannels.some(
        (subscribedChannel) =>
          subscribedChannel._id.toString() === channel._id.toString()
      );
      setSubscribed(isSubscribed);
    }
  }, [channel, subscribedChannels]);

  const getUserPlaylists = async () => {
    try {
      const response = await fetch(`${url}/playlist/user/${channel._id}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("User playlists: ",result.data);
        setPlaylists(result.data);
      } else {
        console.log("Error while fetching user playlists");
      }
    } catch (error) {
      console.log("Error during api call: ", error);
    }
  };

  const getChannelTweets = async () => {
    try {
      const response = await fetch(`${url}/tweets/user/${channel._id}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result.data);
        setTweets(result.data);
      } else {
        console.log("Error while fetching user tweets");
      }
    } catch (error) {
      console.log("Error during API call: ", error);
    }
  };

  const handleSubscriptionToggle = async () => {
    if (!authStatus) {
      alert("Please log in to subscribe.");
      return;
    }
    try {
      console.log(channel._id)
      const response = await fetch(`${url}/subscriptions/c/${channel._id}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setSubscribed((prev) => !prev);
        const result = await response.json()
        console.log(result)
      } else {
        console.error("Error toggling subscription.");
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

  useEffect(() => {
    if (channel) {
      getUserPlaylists();
      getChannelTweets();
    }
  }, [channel]);

  useEffect(() => {
    getChannel(channelUsername);
  }, [channelUsername]);

  if (!channel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-950 text-white">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={
            channel.coverImage ||
            "https://www.colorpalettestore.com/cdn/shop/products/454F57_800x.png?v=1614623474"
          }
          alt="Cover"
          className="w-full h-60 object-cover brightness-75"
        />
        {/* Avatar */}
        <div className="absolute left-8 -bottom-16 flex items-center">
          <img
            src={channel.avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-950 shadow-lg"
          />
        </div>
      </div>

      {/* Channel Details */}
      <div className="mt-20 px-8 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-400">
              {channel.fullname}
            </h1>
            <h2 className="text-lg text-gray-400">@{channel.username}</h2>
          </div>
          {!isUserChannel && (
            <button
              onClick={() => {
                handleSubscriptionToggle();
              }}
              className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all ${
                subscribed
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold text-purple-400">
              {channel.subscribersCount}
            </h3>
            <p className="text-sm text-gray-400">Subscribers</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-purple-400">
              {channel.channelVideos.length}
            </h3>
            <p className="text-sm text-gray-400">Videos</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-purple-400">
              {channel.channelsSubscribedToCount}
            </h3>
            <p className="text-sm text-gray-400">Subscribed Channels</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-8 pb-6">
        <div className="flex gap-4 border-b border-gray-800 pb-2">
          {["videos", "playlists", "tweets"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-t-lg transition-all font-medium ${
                selectedTab === tab
                  ? "bg-purple-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {selectedTab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {channel.channelVideos.map((video) => (
                <Link
                  key={video._id}
                  to={`/video/${video._id}`}
                  className="group bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <Videocard
                    title={video.title}
                    duration={video.duration}
                    thumbnail={video.thumbnail}
                    ownerName={channel.username || "Unknown User"}
                    ownerAvatar={channel.avatar || ""}
                    likes={video.likes || 0}
                    views={video.views || 0}
                  />
                </Link>
              ))}
            </div>
          )}
          {selectedTab === "playlists" && (
            <div>
              {playlists.length === 0 ? (
                <div className="text-center text-gray-400">
                  User does not have any playlists
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {playlists.map((playlist) => (
                    <Link
                      key={playlist._id}
                      to={`/playlist/${playlist._id}`}
                      className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
                    >
                      <div className="relative">
                        <img
                          src={
                            playlist.playlistVideos[0]?.thumbnail ||
                            "https://via.placeholder.com/300x200"
                          }
                          alt={playlist.title}
                          className="w-full h-48 rounded-t-lg object-cover"
                        />
                        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-full">
                          {playlist.videos.length} Videos
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold group-hover:text-purple-400">
                          {playlist.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                          {playlist.description || "No description available"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          {selectedTab === "tweets" && (
            <div>
              {authStatus ? (
                tweets && tweets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tweets.map((tweet) => (
                      <div
                        key={tweet._id}
                        className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={
                              tweet.tweetOwner[0].avatar ||
                              "https://via.placeholder.com/50"
                            }
                            alt={tweet.tweetOwner[0].username}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-4">
                            <p className="text-lg font-bold">
                              {tweet.tweetOwner[0].fullname}
                            </p>
                            <p className="text-sm text-gray-400">
                              @{tweet.tweetOwner[0].username}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">{tweet.content}</p>
                        <button
                          className="text-purple-500 hover:text-purple-600"
                          onClick={() => handleTweetLike(tweet._id)}
                        >
                          {tweet.hasUserLikedTweet ? (
                            <i className="fa-solid fa-heart"></i>
                          ) : (
                            <i className="fa-regular fa-heart"></i>
                          )}{" "}
                          &nbsp;
                          {tweet.tweetLikesCount}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400">
                    No tweets available
                  </p>
                )
              ) : (
                <p className="text-center text-gray-400">
                  Please log in to view tweets
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelLayout;
