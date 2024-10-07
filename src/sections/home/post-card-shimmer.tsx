import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const PostShimmerCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      <div className="h-72 w-full">
        {/* Post Header Shimmer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
          <FaEllipsisH className="text-gray-300" />
        </div>

        {/* Reaction/Comments/Share Shimmer */}
        <div className="mt-4 flex justify-between text-gray-300 text-sm">
          <div className="h-3 bg-gray-300 w-16 rounded"></div>
          <div className="h-3 bg-gray-300 w-24 rounded"></div>
          <div className="h-3 bg-gray-300 w-24 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PostShimmerCard;
