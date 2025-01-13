"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { Grid2 as Grid, Typography } from "@mui/material";
import { IUser } from "@/types/auth";
import UserProfileCard from "../components/user-info-card";

const FriendList = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <div>Loading...</div>;
  }

  const friends = user.friends;

  return (
    <div className="">
      <Typography variant="h5" gutterBottom>
        Friend List
      </Typography>

      {friends.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          You have no friends yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {friends.map((friend: IUser) => (
            <Grid
              size={{
                xs: 6,
                md: 4,
              }}
              key={friend._id}
            >
              <UserProfileCard user={friend} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default FriendList;
