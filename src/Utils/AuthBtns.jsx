import React from "react";
import { Link } from "react-router";

function AuthBtns() {
  return (
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
  );
}

export default AuthBtns;
