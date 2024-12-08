import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout as authLogout } from "../../Store/authSlice";
import { removeSubscriptionData } from "../../Store/subscriptionsSlice";

const Header = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.authStatus);

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) {
        setIsLogoutVisible(false);
      }
    };

    if (isLogoutVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLogoutVisible]);

  const logoutUser = async () => {
    try {
      const response = await fetch(`${url}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        dispatch(authLogout());
        dispatch(removeSubscriptionData());
      } else {
        console.log("Error while logging out");
      }
    } catch (error) {
      console.log("Error during API call: ", error);
    }
  };

  return (
    <header className="bg-black text-white w-full sticky shadow-md  top-0 z-50">
      <div className="container px-1  flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo/Name */}
        <div className="text-3xl font-extrabold text-purple-500 tracking-wide hover:text-purple-400 transition-all duration-300 cursor-pointer w-1/6">
          <Link to="/">Clipocalypse</Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-4/6 mx-4 ">
          <input
            type="text"
            placeholder="Search for videos, channels..."
            className="px-4 py-2 w-full rounded-l-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg transition-all duration-200 text-md">
            Search
          </button>
        </div>

        {/* User Avatar and Name */}
        {authStatus ? (
          <div className="flex items-center gap-5 w-2/6">
            <Link
              to="/upload"
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 text-white rounded-lg text-md font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp; Upload a
              Video
            </Link>

            <div
              className="relative flex flex-col items-center justify-center user-menu"
              onClick={() => setIsLogoutVisible(!isLogoutVisible)}
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src={userData.avatar}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
                />
                <span className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
                  {userData.fullname}
                </span>
              </div>

              {isLogoutVisible && (
                <div className="absolute top-full mt-2 flex flex-col gap-2 w-40 rounded-md shadow-lg">
                  <Link
                    to={`/u/${userData.username}`}
                    className="text-base text-center font-semibold text-gray-300 bg-gray-900 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-500 hover:text-white"
                  >
                    Channel Stats
                  </Link>
                  <button
                    className="text-base font-semibold text-gray-300 bg-gray-900 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-red-500 hover:text-white"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center">
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-md hover:shadow-lg transition-all duration-300"
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
