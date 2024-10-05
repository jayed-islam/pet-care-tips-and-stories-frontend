"use client";

import { useAppSelector } from "@/redux/hooks";
import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const MyFollowingView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="px-5 xl:px-0 w-full">
      <Typography variant="h4" gutterBottom>
        I Am Following
      </Typography>

      {user?.following.length === 0 ? (
        <div className="w-full p-11 bg-white shadow-md border text-center">
          <Typography variant="body1" color="textSecondary">
            No following yet.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {user?.following.map((item) => (
            <div
              key={item._id}
              className="flex items-start gap-5 bg-white border shadow-md w-full p-5"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={item.profilePicture ?? "https://via.placeholder.com/40"}
                  alt={item.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* Follower details */}
              <div className="flex-1">
                <Typography variant="h6">
                  {item.name ?? "Unnamed user"}
                </Typography>
                <div>
                  {item.followers.length} followers . {item.following.length}{" "}
                  following
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFollowingView;
