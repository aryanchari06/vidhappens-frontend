import React, { useId } from "react";
import { useSelector } from "react-redux";
import { AuthBtns } from "../../Utils/indexUtils";
import { Link } from "react-router";

function Sidebar() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const userSubscriptions = useSelector(
    (state) => state.subscriptions.channels
  );

  const dashBoardList = [
    {
      name: "Your Channel",
      url: "/",
    },
    {
      name: "Your Videos",
      url: "/",
    },
    {
      name: "Liked Videos",
      url: "/",
    },
    {
      name: "Watch History",
      url: "/",
    },
  ];

  return (
    <div className="bg-gray-950 bg-opacity-90 text-white p-6 h-full min-h-screen w-64 shadow-lg">
      {authStatus ? (
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
                {dashBoardList.map((item) => {
                  const id = useId();
                  return (
                    <li
                      className="hover:text-purple-400 hover:scale-105 transition-transform cursor-pointer"
                      key={id}
                    >
                      <Link to={item.url}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Subscriptions Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-300 mb-3">
              Subscriptions
            </h2>

            {/* <li className="hover:text-purple-400 hover:scale-105 transition-transform cursor-pointer">
                Channel1
              </li>
              <li className="hover:text-purple-400 hover:scale-105 transition-transform cursor-pointer">
                Channel2
              </li>
              <li className="hover:text-purple-400 hover:scale-105 transition-transform cursor-pointer">
                Channel3
              </li>
              <li className="hover:text-purple-400 hover:scale-105 transition-transform cursor-pointer">
                Channel4
              </li> */}
            {userSubscriptions.length === 0 ? (
              <div>You have not subscribed to any channels</div>
            ) : (
              <ul className="flex flex-col gap-3">
                {userSubscriptions.map((channel) => {
                  const id = useId();
                  return <li key={id}>{channel._id}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-lg font-medium text-gray-300">
            Sign in to explore more
          </h1>
          <div className="hover:scale-105 transition-transform">
            <AuthBtns />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
