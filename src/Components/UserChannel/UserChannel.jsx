import React from "react";

const UserChannel = ({ user }) => {
  const {
    avatar,
    coverImage = "https://images.steelcase.com/image/upload/c_fill,q_auto,f_auto,h_900,w_1600/v1567243086/6130_1000.jpg",
    username,
    fullname,
    totalSubscribers = 0,
    totalViews = 0,
    totalLikesCount = 0,
    totalVideosCount
  } = user;

  return (
    <div className="bg-gray-950 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform  hover:shadow-2xl">
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
    </div>
  );
};

export default UserChannel;
