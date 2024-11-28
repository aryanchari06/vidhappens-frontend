import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const videos = [
    {
      id: 1,
      title: "How to Code",
      thumbnail:
        "https://images.pexels.com/photos/28922850/pexels-photo-28922850/free-photo-of-traditional-japanese-storefront-in-inuyama-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      creator: "John Doe",
    },
    {
      id: 2,
      title: "React Basics",
      thumbnail:
        "https://images.pexels.com/photos/28922850/pexels-photo-28922850/free-photo-of-traditional-japanese-storefront-in-inuyama-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      creator: "Jane Smith",
    },
    {
      id: 3,
      title: "Tailwind Tutorial",
      thumbnail:
        "https://images.pexels.com/photos/28922850/pexels-photo-28922850/free-photo-of-traditional-japanese-storefront-in-inuyama-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      creator: "Tech Guru",
    },
    {
      id: 4,
      title: "JavaScript Tips",
      thumbnail:
        "https://images.pexels.com/photos/28922850/pexels-photo-28922850/free-photo-of-traditional-japanese-storefront-in-inuyama-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      creator: "Dev Ninja",
    },
  ];

  return (
    <div className="bg-black text-white ">
      {/* Hero Section */}
      {authStatus ? (
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
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
