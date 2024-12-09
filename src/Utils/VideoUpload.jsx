import React, { useState } from "react";
import { useForm } from "react-hook-form";

function VideoUpload() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const onFormSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      // Append text fields
      formData.append("title", data.title);
      formData.append("description", data.description);
  
      // Append video and thumbnail files
      formData.append("videoFile", data.video[0]); // Access the file directly
      formData.append("thumbnail", data.thumbnail[0]);
  
      const response = await fetch(`${url}/videos`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        // console.log(result.data);
      } else {
        console.error("Error while uploading video:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-b from-black to-gray-900 text-white p-8 rounded-lg shadow-2xl">
      <h1 className="text-4xl font-bold mb-6 text-purple-400 text-center">
        Upload Your Video
      </h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Video Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-lg font-medium text-white mb-2 tracking-wide"
          >
            Video Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter your video title..."
            className="p-4 border-b outline-none border-b-gray-600 bg-transparent focus:border-b-purple-600 focus:border-b-2   duration-300  focus:shadow-[0_15px_20px_-15px_rgb(147,54,234)]"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 3,
                message: "Title should be at least 3 characters long.",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Video Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg font-medium text-white mb-2 tracking-wide"
          >
            Video Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter your video description..."
            className="p-4 border-b outline-none border-b-gray-600 bg-transparent focus:border-b-purple-600 focus:border-b-2   duration-300 focus:shadow-[0_15px_20px_-15px_rgb(147,54,234)]"
            {...register("description", {
              required: "Description is required.",
              minLength: {
                value: 10,
                message: "Description should be at least 10 characters long.",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Video Upload */}
        <div className="flex flex-col lg:col-span-2">
          <label
            htmlFor="video"
            className="text-lg font-medium text-white mb-2 tracking-wide"
          >
            Video Upload
          </label>
          <input
            id="video"
            type="file"
            accept="video/*"
            className="p-3 border border-gray-600 bg-transparent rounded-md focus:border-purple-600 transition-all duration-200"
            {...register("video", {
              required: "Video is required.",
              validate: {
                fileType: (file) =>
                  (file && file[0].type === "video/mp4") ||
                  "Only MP4 files are allowed.",
                fileSize: (file) =>
                  (file && file[0].size <= 90_000_000) ||
                  "File size must be less than 10MB.",
              },
            })}
            onChange={(e) => {
              handleVideoChange(e);
              register("video").onChange(e);
            }}
          />
          {errors.video && (
            <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
          )}
          {videoPreview && (
            <video
              controls
              src={videoPreview}
              className="mt-4 rounded-lg shadow-lg w-full h-64 object-cover hover:scale-[1.005] transition-transform duration-200 opacity-80 hover:opacity-100"
            />
          )}
        </div>

        {/* Thumbnail Upload */}
        <div className="flex flex-col lg:col-span-2">
          <label
            htmlFor="thumbnail"
            className="text-lg font-medium text-white mb-2 tracking-wide"
          >
            Thumbnail Upload
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            className="p-3 border border-gray-600 bg-transparent rounded-md focus:border-purple-600 transition-all duration-200"
            {...register("thumbnail", {
              required: "Thumbnail is required.",
              validate: {
                fileType: (file) =>
                  (file && file[0].type.startsWith("image/")) ||
                  "Only image files are allowed.",
                fileSize: (file) =>
                  (file && file[0].size <= 5_000_000) ||
                  "File size must be less than 5MB.",
              },
            })}
            onChange={(e) => {
              handleThumbnailChange(e);
              register("thumbnail").onChange(e);
            }}
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-4 opacity-80 hover:opacity-100 rounded-lg shadow-lg w-full h-64 object-cover hover:scale-[1.005] transition-transform duration-200"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2 text-center">
          <button
            type="submit"
            className={`w-1/2 p-4 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 focus:ring focus:ring-purple-400 focus:ring-offset-2 transition-all duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VideoUpload;
