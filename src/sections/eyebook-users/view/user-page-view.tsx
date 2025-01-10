"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid2 as Grid,
  Button,
} from "@mui/material";
import pageLogo from "../../../../public/image/page.jpg";
import CreatePageDialog from "@/sections/pages/view/create-page-dialog";
import useBoolean from "@/hooks/use-boolean";
import Link from "next/link";

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
              <Grid
                key={page._id}
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Link href={`/pages/${page._id}`}>
                  <div className="border rounded-3xl p-3">
                    <Card elevation={0}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={page.logo || pageLogo.src}
                        alt={page.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {page.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {page.description || "No description provided."}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      <CreatePageDialog dialog={dialog} />
    </div>
  );
};

export default UserPagesView;
