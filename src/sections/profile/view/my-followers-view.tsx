"use client";

import { useAppSelector } from "@/redux/hooks";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyFollowersView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="px-5 xl:px-0 w-full">
      <Typography variant="h4" gutterBottom>
        My Followers
      </Typography>

      {user?.followers.length === 0 ? (
        <div className="w-full p-11 bg-white shadow-md border text-center">
          <Typography variant="body1" color="textSecondary">
            No followers yet.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {user?.followers.map((item) => (
            <div
              key={item._id}
              className="flex items-start flex-col lg:flex-row justify-between gap-5 bg-white border shadow-md w-full p-5"
            >
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 relative">
                  <Image
                    src={
                      item.profilePicture ?? "https://via.placeholder.com/40"
                    }
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
              <Link href={`/profile/${item._id}`}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  See Profile
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFollowersView;
