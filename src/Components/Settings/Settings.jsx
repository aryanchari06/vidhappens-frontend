import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Settings() {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`;

  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);
  const [passwordChangeError, setPasswordChangeError] = useState(null);

  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: userData.fullname,
      email: userData.email,
      avatar: userData.avatar,
      coverImage: userData.coverImage,
    },
  });

  const updateNameAndEmail = async ({ data }) => {
    try {
      const response = await fetch(`${url}/users/update-user-details`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname: data.name, email: data.email }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Name and Email updated successfully:", result.data);
      } else {
        console.error("Error updating Name and Email");
      }
    } catch (error) {
      console.error("Error during Name and Email update API call:", error);
    }
  };

  const updateAvatar = async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await fetch(`${url}/users/avatar`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Avatar updated successfully:", result.data);
      } else {
        console.error("Error updating avatar");
      }
    } catch (error) {
      console.error("Error during avatar update API call:", error);
    }
  };

  const updateCoverImage = async (coverImageFile) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImageFile);

      const response = await fetch(`${url}/users/cover-image`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Cover image updated successfully:", result.data);
      } else {
        console.error("Error updating cover image");
      }
    } catch (error) {
      console.error("Error during cover image update API call:", error);
    }
  };

  const updatePassword = async ({ data }) => {
    console.log(data.oldPassword, data.newPassword);
    try {
      const response = await fetch(`${url}/users/change-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        setPasswordChangeSuccess(result.data); // Success message
        console.log(result);
      } else {
        setPasswordChangeError(result.data); // Error message
        console.error(result.message);
      }
    } catch (error) {
      setPasswordChangeError("An unexpected error occurred.");
      console.error("Error during API call: ", error);
    }
  };

  const watchedFields = watch();

  useEffect(() => {
    const isFormChanged =
      watchedFields.name !== userData.fullname ||
      watchedFields.email !== userData.email ||
      watchedFields.avatar !== userData.avatar ||
      watchedFields.coverImage !== userData.coverImage ||
      isPasswordEdit;

    setIsChanged(isFormChanged);
  }, [watchedFields, userData, isPasswordEdit]);

  const handleFormSubmit = async (data) => {
    console.log(data);
    // if(data.oldPassword) console.log("No old password")
    console.log(
      data.coverImage instanceof FileList,
      data.avatar instanceof FileList
    );

    // Update Name and Email if changed
    if (data.email !== userData.email || data.name !== userData.fullname) {
      await updateNameAndEmail({ data });
    }

    // Update Avatar if changed
    if (data.avatar && data.avatar instanceof FileList) {
      await updateAvatar(data.avatar[0]); // Pass the selected file
    }

    // Update Cover Image if changed
    if (data.coverImage && data.coverImage instanceof FileList) {
      await updateCoverImage(data.coverImage[0]); // Pass the selected file
    }

    if (data.oldPassword && data.newPassword) {
      console.log("password needs change");
      const passwordChangeResponse = await updatePassword({ data });
      console.log(passwordChangeResponse);
    }
  };

  return (
    <div className="min-h-screen text-white ">
      <div className="max-w-5xl  p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-purple-500">Settings</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Full Name */}
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="w-32 text-gray-400">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              disabled={!isNameEdit}
              {...register("name", { required: true })}
              className={`flex-1 p-3 bg-transparent text-white outline-none border-b border-b-gray-800 ${
                isNameEdit
                  ? "focus:border-b-purple-600 focus:border-b-2   duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
                  : "border-gray-600"
              }`}
            />
            <button
              type="button"
              onClick={() => {
                if (isNameEdit)
                  reset({ ...watchedFields, name: userData.fullname });
                setIsNameEdit(!isNameEdit);
              }}
              className="text-purple-500 hover:text-purple-400"
            >
              {isNameEdit ? (
                "Cancel"
              ) : (
                <i className="fa-solid fa-pen-to-square"></i>
              )}
            </button>
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">Full Name is required.</p>
          )}

          {/* Email */}
          <div className="flex items-center gap-4">
            <label htmlFor="email" className="w-32 text-gray-400">
              Email:
            </label>
            <input
              type="email"
              id="email"
              disabled={!isEmailEdit}
              {...register("email", { required: true })}
              className={`flex-1 p-3 bg-transparent text-white outline-none border-b border-b-gray-800 ${
                isNameEdit
                  ? "focus:border-b-purple-600 focus:border-b-2   duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
                  : "border-gray-600"
              }`}
            />
            <button
              type="button"
              onClick={() => {
                if (isEmailEdit)
                  reset({ ...watchedFields, email: userData.email });
                setIsEmailEdit(!isEmailEdit);
              }}
              className="text-purple-500 hover:text-purple-400"
            >
              {isEmailEdit ? (
                "Cancel"
              ) : (
                <i className="fa-solid fa-pen-to-square"></i>
              )}
            </button>
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">Email is required.</p>
          )}

          {/* Avatar */}
          <div className="space-y-4">
            <label htmlFor="avatar" className="block text-gray-400">
              Avatar:
            </label>
            <div className="flex items-center gap-6">
              <img
                src={watchedFields.avatar || userData.avatar}
                alt="Avatar"
                className="h-20 w-20 rounded-full border border-gray-700 object-cover"
              />
              <input
                type="file"
                id="avatar"
                accept="image/*"
                {...register("avatar")}
                className="w-full text-gray-400 file:bg-purple-600 file:text-white file:rounded-md file:py-2 file:px-4 file:border-none file:cursor-pointer"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-4">
            <label htmlFor="coverImage" className="block text-gray-400">
              Cover Image:
            </label>
            <div className="flex flex-col gap-4">
              <img
                src={
                  watchedFields.coverImage ||
                  userData.coverImage ||
                  "https://images.steelcase.com/image/upload/c_fill,q_auto,f_auto,h_900,w_1600/v1567243086/6130_1000.jpg"
                }
                alt="Cover"
                className="w-full h-40 object-cover rounded-md border border-gray-700"
              />
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                {...register("coverImage")}
                className="w-full text-gray-400 file:bg-purple-600 file:text-white file:rounded-md file:py-2 file:px-4 file:border-none file:cursor-pointer"
              />
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-4">
            <label htmlFor="password" className="block text-gray-400">
              Change Password:
            </label>
            <div
              className={`space-y-2 flex flex-col gap-2 ${
                isPasswordEdit ? "opacity-100" : "opacity-40"
              }`}
            >
              <input
                type="password"
                id="oldPassword"
                placeholder="Old Password"
                disabled={!isPasswordEdit}
                {...register("oldPassword", {
                  required: {
                    value: isPasswordEdit,
                    message: " Old Password is required.",
                  },
                  minLength: {
                    value: 4,
                    message: "Minimum length of password should be 4",
                  },
                })}
                className={`flex-1 p-3 bg-transparent text-white outline-none border-b border-b-gray-800 ${
                  isNameEdit
                    ? "focus:border-b-purple-600 focus:border-b-2 duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
                    : "border-gray-600"
                }`}
              />
              <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                disabled={!isPasswordEdit}
                {...register("newPassword", {
                  required: {
                    value: isPasswordEdit,
                    message: " New Password is required.",
                  },
                  minLength: {
                    value: 4,
                    message: "Minimum length of password should be 4",
                  },
                })}
                className={`flex-1 p-3 bg-transparent text-white outline-none  border-b border-b-gray-800 ${
                  isNameEdit
                    ? "focus:border-b-purple-600 focus:border-b-2   duration-300  focus:shadow-[0_15px_20px_-10px_rgb(147,54,234)]"
                    : "border-gray-600"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (isPasswordEdit)
                  reset({
                    ...watchedFields,
                    oldPassword: "",
                    newPassword: "",
                  });
                setIsPasswordEdit(!isPasswordEdit);
              }}
              className="text-purple-500 hover:text-purple-400"
            >
              {isPasswordEdit ? "Cancel" : "Change Password"}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-sm text-red-500">{errors.oldPassword.message}</p>
          )}
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
          {/* {passwordChangeSuccess ? <p>{passwordChangeSuccess}</p> : <></>} */}
          <div className="space-y-4">
            {passwordChangeError && (
              <p className="text-lg text-red-500">{passwordChangeError}</p>
            )}
            {passwordChangeSuccess && (
              <p className="text-lg text-white">{passwordChangeSuccess}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!isChanged || isSubmitting}
              className={`w-full py-3 text-lg font-medium rounded-md ${
                !isChanged || isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
