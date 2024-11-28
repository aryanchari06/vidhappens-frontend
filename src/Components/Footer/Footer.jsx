import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold text-purple-500">
          Clipocalypse
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright Information */}
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Clipocalypse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
