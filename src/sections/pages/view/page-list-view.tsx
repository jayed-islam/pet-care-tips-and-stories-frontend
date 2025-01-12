"use client";

import React from "react";
import { Box, CircularProgress, Grid2 as Grid } from "@mui/material";
import PageCard from "../components/page-card";
import { useGetPageListQuery } from "@/redux/reducers/page/pageApi";
import PageHeaderGlobal from "@/components/elements/page";

const PageListView = () => {
  const { data, isFetching } = useGetPageListQuery();
  return (
    <div>
      <div className="pr-3">
        <div className="h-full w-full relative border-r">
          <PageHeaderGlobal title="eyebook pages" />

          <div className="p-5">
            {isFetching ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              // Show the Page Cards once data is loaded
              <Grid container spacing={3}>
                {data?.data?.map((page) => (
                  <PageCard page={page} key={page._id} />
                ))}
              </Grid>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageListView;
