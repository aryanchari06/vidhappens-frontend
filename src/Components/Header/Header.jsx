import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as authLogout } from "../../Store/authSlice";
import { removeSubscriptionData } from "../../Store/subscriptionsSlice";
import { setQueryVideos, clearQueryVideos } from "../../Store/queryVideosSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryText, setQueryText] = useState("");

  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.authStatus);

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleLogoClick = () => {
    dispatch(clearQueryVideos());
  };

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
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (result) {
          dispatch(authLogout());
          dispatch(removeSubscriptionData());
        }
      } else {
        console.log("Error while logging out");
      }
    } catch (error) {
      console.log("Error during API call: ", error);
    }
  };

  const getQueriedVideos = async (e) => {
    e.preventDefault();
    try {
      const query = {
        page: 1,
        limit: 10,
        query: queryText, // Search term
        sortBy: "createdAt",
        sortType: 1,
      };

      const params = new URLSearchParams(query).toString();

      const response = await fetch(`${url}/videos/?${params}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.data.docs);
        dispatch(setQueryVideos(result.data.docs));
        navigate("/");
      } else {
        console.log("Error while fetching queried videos");
      }
    } catch (error) {
      console.log("Error during API call: ", error);
    }
  };

  return (
    <header className="bg-black text-white w-full sticky top-0 z-50 shadow-md py-2">
      <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo/Name */}
        <div
          onClick={handleLogoClick}
          className="text-3xl font-extrabold text-purple-500 tracking-wide hover:text-purple-400 transition duration-300 cursor-pointer"
        >
          <Link to="/">VidHappens</Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-4/6">
          <form
            onSubmit={getQueriedVideos}
            className="flex items-center w-full"
          >
            <input
              type="text"
              placeholder="Search for videos..."
              className="px-4 py-2 w-full rounded-l-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              onChange={(e) => setQueryText(e.target.value)}
            />
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg transition duration-200">
              Search
            </button>
          </form>
        </div>

        {/* User Avatar and Name */}
        {authStatus ? (
          <div className="flex items-center gap-4">
            <Link
              to="/upload"
              className="bg-purple-500 text-md hover:bg-purple-600 pl-4 py-2 text-white rounded-lg font-semibold transition duration-200 shadow hover:shadow-lg flex items-center w-full"
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;
              <span> Upload a Video</span>
            </Link>

            <div
              className="relative flex flex-col items-center user-menu"
              onClick={() => setIsLogoutVisible(!isLogoutVisible)}
            >
              <div className="flex items-center gap-3 cursor-pointer w-full">
                <img
                  src={userData.avatar}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border-2 border-purple-500 shadow"
                />
                <span className="text-sm w-full font-medium text-gray-300 hover:text-white transition duration-200">
                  {userData.fullname}
                </span>
              </div>

              {isLogoutVisible && (
                <div className="absolute top-full mt-2 flex flex-col gap-2 w-40 bg-gray-900 rounded-md shadow-lg">
                  <Link
                    to={`/u/${userData.username}`}
                    className="text-base text-center font-semibold text-gray-300 px-4 py-2 rounded-md transition duration-200 hover:bg-purple-500 hover:text-white"
                  >
                    Channel Stats
                  </Link>
                  <button
                    className="text-base font-semibold text-gray-300 px-4 py-2 rounded-md transition duration-200 hover:bg-red-500 hover:text-white"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-md hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-300 hover:bg-white text-purple-600 px-4 py-2 rounded-lg text-md hover:shadow-lg transition duration-300"
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
