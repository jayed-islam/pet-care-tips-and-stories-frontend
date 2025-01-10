"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { Grid2 as Grid, Button, Typography } from "@mui/material";
import CreatePageDialog from "@/sections/pages/view/create-page-dialog";
import useBoolean from "@/hooks/use-boolean";
import PageCard from "@/sections/pages/components/page-card";

const UserPagesView = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dialog = useBoolean();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user?.pages?.length === 0 ? (
        <div className="">
          <Typography variant="h5" gutterBottom>
            My Page List
          </Typography>
          <Typography variant="h6" color="textSecondary">
            You have not created any pages yet.
          </Typography>

          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              mt: 2,
            }}
            onClick={dialog.setTrue}
          >
            Create a page
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center flex-col md:flex-row justify-between">
            <Typography variant="h5" gutterBottom>
              My Page List
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                mb: 2,
              }}
              onClick={dialog.setTrue}
            >
              Create a page
            </Button>
          </div>
          <Grid container spacing={3}>
            {user.pages.map((page) => (
              <PageCard page={page} />
            ))}
          </Grid>
        </div>
      )}

      <CreatePageDialog dialog={dialog} />
    </div>
  );
};

export default UserPagesView;
