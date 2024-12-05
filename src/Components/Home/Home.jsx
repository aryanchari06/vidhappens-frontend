import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Videocard } from "../index";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [videos, setVideos] = useState([]);

  const fetchAllVideos = async () => {
    try {
      const response = await fetch(`${url}/videos/`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        const videos = result.data;
        // console.log(videos.docs);
        setVideos(videos.docs);
      } else {
        console.log("Error while fetching videos: ", response.statusText);
      }
    } catch (error) {
      console.log("Error during API Call:", error);
    }
  };

  useEffect(() => {
    if (authStatus) fetchAllVideos();
  }, [authStatus, userData]);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      {authStatus ? (
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Link
                key={video._id}
                to={`/video/${video._id}`}
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <Videocard
                  title={video.title}
                  duration={video.duration}
                  thumbnail={video.thumbnail}
                  ownerName={video.videoOwner[0].username}
                  ownerAvatar={video.videoOwner[0].avatar}
                  likes={video.likesCount}
                  views={video.views}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-black text-center py-20 px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-500 mb-6">
            Welcome to Clipocalypse
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Share your favorite videos and discover new content from creators
            around the world.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
