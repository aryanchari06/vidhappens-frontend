import { useEffect, useState } from "react";
import "./App.css";
import { Header, Footer, Sidebar } from "./Components/index";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "./Store/authSlice";
import { setSubscriptionData } from "./Store/subscriptionsSlice";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/current-user`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const user = await response.json();
        // console.log("User:", user.data);
        dispatch(authLogin(user.data));
      } else {
        console.error(
          "Error fetching user:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log("Error while calling API: ", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (authStatus) {
    const getUserSubscriptions = async () => {
      try {
        const response = await fetch(`${url}/subscriptions/c/${userData._id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.data);
          dispatch(setSubscriptionData(result.data));
        } else {
          console.log("Error while fetching user subscriptions!");
        }
      } catch (error) {
        console.log("Error during API call: ", error);
      }
    };

    getUserSubscriptions();
  }

  return (
    <div className="w-full bg-black text-white min-h-[80vh]">
      {/* Header Section */}
      <div className="flex items-center px-4 py-4 bg-black shadow-lg">
        <button
          className="text-white focus:outline-none mr-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex min-h-[80vh]">
        {isSidebarOpen && <Sidebar />}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
