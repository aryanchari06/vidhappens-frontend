import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthBtns } from "../../Utils/indexUtils";
import { Link } from "react-router-dom"; // Fixed import

function Sidebar() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const userSubscriptions = useSelector(
    (state) => state.subscriptions.channels || []
  );
  const [dashBoardList, setDashBoardList] = useState([]);

  useEffect(() => {
    if (authStatus && userData) {
      setDashBoardList([
        { name: "Your Channel", url: `/u/${userData.username}` || "" },
        { name: "Your Videos", url: `/u/${userData.username}/videos` || "" },
        { name: "Liked Videos", url: "/" },
        { name: "Your Playlists", url: "/" },
        { name: "Watch History", url: "/" },
      ]);
    }
  }, [authStatus, userData]);

  return (
    <div className="bg-gray-950 bg-opacity-90 text-white p-6 h-full min-h-screen w-64 shadow-lg">
      {authStatus && userData ? (
        <div className="flex flex-col gap-8">
          {/* User Section */}
          <div>
            <h1 className="text-2xl font-bold text-purple-400 mb-6">
              Hello, {userData.fullname}
            </h1>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-medium text-gray-300 mb-3">
                Your Dashboard
              </h2>
              <ul className="flex flex-col gap-3">
                {dashBoardList.map((item) => (
                  <li
                    className="hover:text-purple-400 transition-transform cursor-pointer"
                    key={item.url}
                  >
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subscriptions Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-300 mb-3">
              Subscriptions
            </h2>
            {userSubscriptions.length === 0 ? (
              <div className="text-gray-500">
                You have not subscribed to any channels
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {userSubscriptions.map((channel) => (
                  <li key={channel.username}>
                    <Link
                      to={`/c/${channel.username}`}
                      className="flex gap-2 items-center hover:text-purple-400  transition-transform"
                    >
                      <img
                        src={channel.avatar}
                        className="h-8 w-8 rounded-full border border-gray-700"
                        alt={`${channel.username} avatar`}
                      />
                      <p className="text-gray-300">{channel.username}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-lg font-medium text-gray-300">
            Sign in to explore more
          </h1>
          <div className=" transition-transform">
            <AuthBtns />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
