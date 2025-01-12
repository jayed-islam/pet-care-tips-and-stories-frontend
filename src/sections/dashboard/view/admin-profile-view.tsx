"use client";

import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Paper, Grid, Typography, Divider, Box, Button } from "@mui/material";
import ProfilePictureUploader from "@/layouts/profile/components/profile-photo-change";
import { IUser } from "@/types/auth";
import UpdateMyProfileDialog from "@/sections/profile/view/update-my-profile";
import useBoolean from "@/hooks/use-boolean";

const AdminProfileView = () => {
  const { user } = useAppSelector((state) => state.auth);

  const updateProfileDialog = useBoolean();

  // Fallback for missing user data
  if (!user) {
    return (
      <Typography variant="h6" align="center" color="error">
        No user data found.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} container>
            {/* <Avatar
              sx={{ width: 120, height: 120 }}
              src={user?.profilePicture || userLogo.src}
            /> */}
            <div className="flex flex-col gap-5">
              <ProfilePictureUploader user={user as IUser} />
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "3rem",
                }}
                onClick={updateProfileDialog.setTrue}
              >
                Update profile
              </Button>
            </div>
          </Grid>

          {/* User Info Section */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {user.name || "No Name Provided"}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {user.role || "No Role"}
            </Typography>
            <Divider sx={{ margin: "16px 0" }} />

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1" color="textPrimary">
                <strong>Email:</strong> {user.email || "No Email Provided"}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Username:</strong> {user.username || "No Username"}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Phone:</strong> {user.phone || "N/A"}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt as Date).toLocaleDateString() ||
                  "Not Available"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <UpdateMyProfileDialog dialog={updateProfileDialog} />
    </Box>
  );
};

export default AdminProfileView;
