/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import banner from "../../../public/image/banner.jpg";
import React from "react";
import Image from "next/image";
import PostCard from "@/sections/home/post-card";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/auth";
import { Button } from "@mui/material";
import useBoolean from "@/hooks/use-boolean";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/post/post-create-dialog";
import Link from "next/link";
import { paths } from "@/layouts/paths";
import ProfilePictureUploader from "./view/profile-photochange";
import UpdateMyProfileDialog from "./view/update-my-profile";

interface Props {
  id?: string;
}

const MyPurchasedPostView = ({ id }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const updateProfileDialog = useBoolean();
  const auth = useBoolean();
  const postCreation = useBoolean();

  return (
    <div className="w-full bg-[#F0F2F5]">
      <div className="w-full bg-white shadow border-b relative pb-16">
        <Image
          src={banner}
          alt="banner"
          height={100}
          width={100}
          className="h-72 w-full object-cover"
        />

        <div className="max-w-5xl mx-auto -mt-11 flex items-center justify-center md:items-end md:justify-between flex-col md:flex-row px-5 xl:px-0">
          <div className="flex items-center md:items-end gap-5 flex-col md:flex-row ">
            <ProfilePictureUploader user={user as IUser} />
            <div className="flex items-center flex-col md:items-start">
              <h2 className="text-2xl md:text-4xl font-semibold">
                {user?.name ?? "Unnamed user"}
              </h2>

              <div className="flex items-center gap-2">
                <h2 className="text-lg ">{user?.followers.length} followers</h2>
                <p className="text-xl">.</p>
                <h2 className="text-lg ">{user?.following.length} following</h2>
              </div>
            </div>
          </div>
          {/* <FollowButton profile={user as IUser} /> */}
          <div className="flex flex-col gap-3 md:flex-row  mt-3 md:mt-0">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
              }}
              onClick={updateProfileDialog.setTrue}
            >
              Update Profile
            </Button>
            <Link href="/my-profile">
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Back to profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-5 xl:px-0 py-11">
        {user?.purchasedPosts.length === 0 ? (
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">No Items Purchased</h2>
            <p className="text-gray-600 mt-2">
              You haven't purchased any posts yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {user?.purchasedPosts.map((post) => (
              <PostCard post={post} userId={user._id as string} />
            ))}
          </div>
        )}
      </div>
      <UpdateMyProfileDialog dialog={updateProfileDialog} />
      <AuthDialog dialog={auth} />
      <PostDialog dialog={postCreation} />
    </div>
  );
};

export default MyPurchasedPostView;
