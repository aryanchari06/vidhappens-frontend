import React from "react";

const DeleteVideoModal = ({ isOpen, closeModal, handleDelete }) => {
  if (!isOpen) return null; // If the modal is not open, do not render it

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Are you sure?</h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this video? This action cannot be undone.
        </p>
        <div className="flex justify-between gap-4">
          {/* Cancel Button */}
          <button
            onClick={closeModal}
            className="w-full py-2 px-4 text-lg font-medium rounded-md bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 text-lg font-medium rounded-md bg-purple-600 hover:bg-purple-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVideoModal;
