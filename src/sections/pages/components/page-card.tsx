import { IPage } from "@/types/page";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import pageLogo from "../../../../public/image/page.jpg";
import PageToggleFollowButton from "./page-toggle-follow-button";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  page: IPage;
  isMyPage?: boolean;
}

const PageCard = ({ page }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const isCreator = user?._id === page.createdBy?._id;
  return (
    <Grid
      key={page._id}
      size={{
        xs: 6,
      }}
    >
      <div className="border rounded-3xl p-3 h-full">
        <Card elevation={0}>
          <Link href={`/pages/${page._id}`}>
            <CardMedia
              component="img"
              height="140"
              image={page.logo || pageLogo.src}
              alt={page.name}
            />
          </Link>
          <Link href={`/pages/${page._id}`}>
            <Typography variant="h6" component="div">
              {page.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            {page.description || "No description provided."}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {page.followers.length || 0} followers
          </Typography>
          {!isCreator && <PageToggleFollowButton page={page} />}
        </Card>
      </div>
    </Grid>
  );
};

export default PageCard;
