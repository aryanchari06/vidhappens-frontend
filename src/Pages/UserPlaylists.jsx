import React, { useState } from "react";
import { UserPlaylists as PlaylistsComponent } from "../Components/index";
import { useSelector } from "react-redux";
import AuthBtns from "../Utils/AuthBtns";
import { useForm } from "react-hook-form";

function UserPlaylists() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const authStatus = useSelector((state) => state.auth.authStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const openModal = () => {
    setApiError(null); // Clear any previous API errors
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset(); // Reset form fields
  };

  const handleCreatePlaylist = async (data) => {
    setApiError(null); // Reset API error
    try {
      const response = await fetch(`${url}/playlist/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const createdPlaylist = await response.json();
        console.log("Playlist created successfully:", createdPlaylist);
        // TODO: Update the playlists displayed on the page
        closeModal();
      } else {
        const errorText = await response.text();
        setApiError(`Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      setApiError(`An unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      {authStatus ? (
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-purple-400">
              Your Playlists
            </h1>
            <button
              onClick={openModal}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
            >
              Add Playlist
            </button>
          </div>
          <PlaylistsComponent />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-300">
            Please log in to browse your playlists
          </h2>
          <AuthBtns />
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl text-purple-400 font-bold mb-4">
              Create New Playlist
            </h2>
            {apiError && (
              <p className="text-red-500 text-sm mb-4">{apiError}</p>
            )}
            <form onSubmit={handleSubmit(handleCreatePlaylist)}>
              <div className="mb-4">
                <label
                  htmlFor="playlistName"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Playlist Name
                </label>
                <input
                  type="text"
                  id="playlistName"
                  placeholder="Enter playlist name"
                  className={`w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-purple-500"
                  }`}
                  {...register("name", {
                    required: "Playlist name is required.",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="playlistDescription"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Playlist Description
                </label>
                <textarea
                  id="playlistDescription"
                  placeholder="Enter playlist description"
                  rows={4}
                  className={`w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 ${
                    errors.description
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                  {...register("description", {
                    required: "Playlist description is required.",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  {isSubmitting ? "Creating..." : "Create Playlist"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;
