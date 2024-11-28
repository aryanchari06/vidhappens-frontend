import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);
  return (
    <header className="bg-black text-white w-full shadow-md sticky top-0 z-50">
      <div className="container px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo/Name */}
        <div className="text-3xl font-extrabold text-purple-500 tracking-wide hover:text-purple-400 transition-all duration-300 cursor-pointer">
          Clipocalypse
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full mx-10 ">
          <input
            type="text"
            placeholder="Search for videos, channels..."
            className="px-4 py-2 w-full rounded-l-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg transition-all duration-200">
            Search
          </button>
        </div>

        {/* User Avatar and Name */}
        {authStatus ? (
          <div className="flex items-center gap-5">
            <Link
              to="/upload"
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 text-white rounded-lg text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Upload
            </Link>

            <div className="flex items-center gap-4">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEhBYaldyR_rg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712338616576?e=2147483647&v=beta&t=bziv00oSahHbPawEkrwZwMN3C2ReWGTKRTRhBkro66k"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
              />
              <span className="text-md font-medium text-gray-300 hover:text-white transition-all duration-200">
                User Name
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center">
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2  rounded-lg text-md hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-300 hover:bg-white text-purple-600 px-4 py-2 rounded-lg text-md hover:shadow-lg transition-all duration-300"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
