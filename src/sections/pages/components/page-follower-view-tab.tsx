import { paths } from "@/layouts/paths";
import { IPage } from "@/types/page";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  page: IPage;
}

const PageFollowerViewTab = ({ page }: Props) => {
  return (
    <div>
      <div className="px-3 mt-4 space-y-4">
        {page.followers.length > 0 ? (
          page?.followers.map((item) => (
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
                    {item.name ?? "Eyebook user"}
                  </Typography>
                  <div>
                    {item.followers.length} followers . {item.following.length}{" "}
                    following
                  </div>
                </div>
              </div>
              <Link href={`${paths.userProfile}/${item._id}`}>
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
          ))
        ) : (
          <p className="text-center text-gray-500">No followers found.</p>
        )}
      </div>
    </div>
  );
};

export default PageFollowerViewTab;
