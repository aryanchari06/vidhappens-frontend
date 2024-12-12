import { useEffect, useState } from "react";
import "./App.css";
import { Header, Footer, Sidebar } from "./Components/index";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "./Store/authSlice";
import { setSubscriptionData } from "./Store/subscriptionsSlice";
import { setStats } from "./Store/statsSlice";
import { setVideos } from "./Store/videosSlice";
import { setPlaylists } from "./Store/playlistsSlice";
import { setTweets } from "./Store/tweetsSlice";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(authStatus);

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${url}/users/current-user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        dispatch(authLogin(user.data));
      } else {
        console.error(
          "Error fetching user:",
          response.status,
        );
      }
    } catch (error) {
      console.error("Error while calling API: ", error);
    }
  };

  const fetchUserData = async () => {
    if (!userData?._id) return;

    try {
      const [videosRes, playlistsRes, subscriptionsRes, statsRes, tweetsRes] =
        await Promise.all([
          fetch(`${url}/dashboard/videos`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${url}/playlist/user/${userData._id}`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${url}/subscriptions/c/${userData._id}`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${url}/dashboard/stats`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${url}/tweets/user/${userData._id}`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

      if (videosRes.ok) {
        const videos = await videosRes.json();
        dispatch(setVideos(videos.data));
      }

      if (playlistsRes.ok) {
        const playlists = await playlistsRes.json();
        dispatch(setPlaylists(playlists.data));
      }

      if (subscriptionsRes.ok) {
        const subscriptions = await subscriptionsRes.json();
        const subscribedChannelsDoc = await subscriptions.data;
        const channels = await subscribedChannelsDoc.map(
          (channel) => channel.channelUserSubscribedTo[0]
        );
        dispatch(setSubscriptionData(channels));
        // console.log(channels);
      }

      if (statsRes.ok) {
        const stats = await statsRes.json();
        dispatch(setStats(stats.data[0]));
      }

      if (tweetsRes.ok) {
        const tweets = await tweetsRes.json();
        // console.log(tweets)
        dispatch(setTweets(tweets.data));
      }
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    setIsSidebarOpen(authStatus)
  }, [authStatus]);

  useEffect(() => {
    if (authStatus) {
      fetchUserData();
    }
  }, [authStatus, userData?._id]);

  return (
    <div className="w-full bg-black text-white min-h-[80vh]">
      {/* Header Section */}
      <div className="flex items-center px-4 py-2 bg-black shadow-lg">
        <button
          className="text-white focus:outline-none"
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
