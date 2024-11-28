import { useState } from "react";
import "./App.css";
import { Header, Footer, Sidebar } from "./Components/index";
import { Outlet } from "react-router";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
