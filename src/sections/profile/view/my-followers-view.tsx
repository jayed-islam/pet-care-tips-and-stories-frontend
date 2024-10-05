"use client";

import { useAppSelector } from "@/redux/hooks";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.followers.map((follower) => (
            <Card key={follower._id} className="shadow-md">
              <CardContent className="flex items-center">
                <div className="w-16 h-16 mr-4 relative">
                  <Image
                    src={
                      follower.profilePicture ??
                      "https://via.placeholder.com/40"
                    }
                    alt={follower.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Follower details */}
                <div className="flex-1">
                  <Typography variant="h6">{follower.name}</Typography>

                  {/* Follow/Unfollow Button */}
                  <Button variant="contained">Follow</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFollowersView;
