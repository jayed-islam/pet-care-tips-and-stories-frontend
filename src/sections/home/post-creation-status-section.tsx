import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon

const PostCreationStatusSection = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4 border">
      {/* Profile Icon and Input */}
      <div className="flex items-center space-x-3">
        {/* User Profile Icon */}
        <FaUserCircle className="text-gray-400 text-4xl" />

        {/* Text Input */}
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 bg-gray-100 focus:bg-gray-200 focus:outline-none rounded-full px-4 py-2 text-gray-700"
        />
      </div>
    </div>
  );
};

export default PostCreationStatusSection;
