"use client";

import React from "react";
import { Button, Grid2 as Grid, Typography } from "@mui/material";
import PageCard from "../components/page-card";
import PageHeaderGlobal from "@/components/elements/page";
import { useAppSelector } from "@/redux/hooks";
import CreatePageDialog from "./create-page-dialog";
import useBoolean from "@/hooks/use-boolean";

const MyPageListView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dialog = useBoolean();
  return (
    <div>
      <div className="min-h-screen px-5">
        <div className="h-full w-full relative">
          <PageHeaderGlobal title="My pages" />

          <div className="pt-5">
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
                  {user?.pages.map((page) => (
                    <PageCard page={page} key={page._id} />
                  ))}
                </Grid>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreatePageDialog dialog={dialog} />
    </div>
  );
};

export default MyPageListView;
