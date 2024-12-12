import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Videocard, VideosLayout } from "../../Utils/indexUtils";
import { clearQueryVideos } from "../../Store/queryVideosSlice";

const Home = () => {
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;
  const [videos, setVideos] = useState([]);

  const queryVideos = useSelector((state) => state.queryVideos.videos);

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
        // dispatch(clearQueryVideos());
      } else {
        console.log("Error while fetching videos: ", response.statusText);
      }
    } catch (error) {
      console.log("Error during API Call:", error);
    }
  };

  useEffect(() => {
    if (authStatus) {
      if (queryVideos.length > 0) {
        // Show queried videos if available
        setVideos(queryVideos);
      } else {
        // Fetch all videos if no queried videos are present
        fetchAllVideos();
      }
    }
  }, [authStatus, queryVideos]);

  return (
    <div className="bg-black text-white min-h-screen ">
      {/* Hero Section */}
      {authStatus ? (
        <div className="container mx-auto px-6 py-12 w-full">
          <div className="w-full flex items-center justify-center mx-auto">
            <VideosLayout videos={videos} />
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-gray-900 via-black to-gray-950 text-center py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">
            Welcome to VidHappens
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6">
            Share your favorite videos and discover new content from creators
            around the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-md text-lg font-medium shadow-md transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-md text-lg font-medium shadow-md transition-all"
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
