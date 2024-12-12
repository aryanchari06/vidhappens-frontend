import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { login as authLogin } from "../../Store/authSlice";
import { useNavigate } from "react-router";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const formSubmit = async (formData) => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/api/v1/users/register`;

      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);

      if (formData.avatar[0]) {
        formDataToSend.append("avatar", formData.avatar[0]);
      }
      if (formData.coverImage[0]) {
        formDataToSend.append("coverImage", formData.coverImage[0]);
      }

      const registerUser = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      const response = await registerUser.json();
      console.log(response);

      if (registerUser.ok) {
        console.log("User registered successfully!");
        dispatch(authLogin(response.data));
        navigate("/");
      } else {
        console.log("Registration failed:", response.message);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center my-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-4">
        Signup for free!
      </h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-black p-8 rounded-lg shadow-lg w-full max-w-xl"
      >
        {/* Fullname */}
        <div className="mb-6">
          <label htmlFor="fullname" className="block mb-2 text-white">
            Full Name:
          </label>
          <input
            type="text"
            id="fullname"
            {...register("fullname", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name should have a minimum length of 3",
              },
            })}
            className="w-full px-4 py-2 outline-none text-white border-b border-b-gray-600 bg-transparent focus:border-b-purple-600 focus:border-b-2 duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
            placeholder="Enter your full name..."
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-2 outline-none text-white border-b border-b-gray-600 bg-transparent focus:border-b-purple-600 focus:border-b-2 duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
            placeholder="Enter your email ID..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-white">
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]{3,20}$/,
                message: "Invalid username format",
              },
            })}
            className="w-full px-4 py-2 outline-none text-white border-b border-b-gray-600 bg-transparent focus:border-b-purple-600 focus:border-b-2 duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
            placeholder="Enter a username..."
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should have a minimum length of 6",
              },
            })}
            className="w-full px-4 py-2 outline-none text-white border-b border-b-gray-600 bg-transparent focus:border-b-purple-600 focus:border-b-2 duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
            placeholder="Enter a password..."
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Avatar */}
        <div className="mb-6">
          <label htmlFor="avatar" className="block mb-2 text-white">
            Avatar:
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/png, image/jpg, image/jpeg"
            {...register("avatar", {
              required: "Avatar is required",
            })}
            className="p-3 border border-gray-600 bg-transparent rounded-md focus:border-purple-600 transition-all duration-200"
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-2">{errors.avatar.message}</p>
          )}
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <label htmlFor="cover-image" className="block mb-2 text-white">
            Cover Image:
          </label>
          <input
            type="file"
            id="cover-image"
            accept="image/png, image/jpg, image/jpeg"
            {...register("coverImage")}
            className="p-3 border border-gray-600 bg-transparent rounded-md focus:border-purple-600 transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
