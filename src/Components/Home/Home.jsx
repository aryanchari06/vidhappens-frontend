import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // Check if the accessToken exists in cookies
    const accessToken = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("accessToken="));

    const refreshToken = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("refreshToken="));

    if (accessToken && refreshToken) {
      console.log("Tokens are present: ", accessToken," ", refreshToken);
      // You can dispatch an action to update the state or validate the token
      // For example, you can fetch user data with the access token
      const token = accessToken.split("=")[1]; // Extract token value
      // Now you can use this token to fetch the user data
    } else {
      console.log("Tokens are not present");
    }
  }, []);

  console.log(userData)
  const [videos, setVideos] = useState([]);
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/videos`;

  // Fetching videos when the component mounts
  // useEffect(() => {
  //   if (authStatus) {
  //     const getAllVideos = async () => {
  //       try {
  //         const response = await fetch(url, {
  //           method: "GET",
  //           headers: {
  //             // Add Authorization header if needed
  //             "Authorization": `Bearer ${userData?.token}`, // Adjust according to how your token is stored
  //           },
  //         });

  //         if (response.ok) {
  //           const responseData = await response.json();
  //           setVideos(responseData.data); // Assuming the response has a 'data' property with video info
  //         } else {
  //           console.log("Failed to fetch videos:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.log("Error fetching videos:", error);
  //       }
  //     };

  //     getAllVideos();
  //   }
  // }, [authStatus, url, userData?.token]); 

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      {authStatus ? (
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Link
                key={video.id}
                to={`/video/${video.id}`}
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-gray-100 truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400">By {video.creator}</p>
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
