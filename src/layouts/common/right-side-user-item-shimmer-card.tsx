import React from "react";
import { Skeleton } from "@mui/material";

const UserShimmerItem = () => {
  return (
    <div className="flex items-center justify-between last:border-none transition-all duration-500">
      {/* User Info */}
      <div className="flex items-center">
        {/* Placeholder Logo */}
        <Skeleton
          variant="circular"
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        {/* User Details */}
        <div className="ml-4">
          <div className="flex items-center">
            <Skeleton
              variant="text"
              width={100}
              height={20}
              className="text-sm font-semibold"
            />
          </div>
          <Skeleton
            variant="text"
            width={150}
            height={16}
            className="text-sm text-gray-500 mt-1"
          />
        </div>
      </div>
      {/* Follow Button Placeholder */}
      <Skeleton
        variant="rectangular"
        width={80}
        height={32}
        className="rounded-full"
      />
    </div>
  );
};

export default UserShimmerItem;
