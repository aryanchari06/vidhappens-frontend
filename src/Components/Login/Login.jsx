import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // corrected import for react-router
import { login as authLogin } from "../../Store/authSlice";

function Login() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/login`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  

  // Form submission handler
  const formSubmit = async (data) => {
    // Log data to debug
    console.log(data);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add proper content type
        },
        body: JSON.stringify(data), // Send the data as a JSON object
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        const userData = responseData.data;
        dispatch(
          authLogin({ user: userData.user, accessToken: userData.accessToken })
        );
        navigate("/");
      } else {
        console.error("Login failed", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Conditional rendering based on authentication status */}
      {!authStatus ? (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-purple-500 text-center mb-6">
              Login to Watch Videos
            </h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
              {/* Email/Username Field */}
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Email/Username
                </label>
                <input
                  id="emailOrUsername"
                  type="text"
                  {...register("email", {
                    required: "Email or username is required!",
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9._-]{3,20})$/,
                      message: "Invalid email or username format",
                    },
                  })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 4,
                      message: "Minimum password length should be 4.",
                    },
                  })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? "bg-purple-700 text-gray-400 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl text-purple-500">User already logged in</h1>
          <Link to="/" className="text-purple-500 hover:text-purple-600">
            Go to Homepage
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
