"use client";

import React from "react";
import PostCard from "@/sections/home/post-card";
import { IPage } from "@/types/page";
import { useAppSelector } from "@/redux/hooks";
import PostCreationStatusSection from "@/sections/home/post-creation-status-section";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/profile/post-create-dialog";
import PostSnackbar from "@/sections/profile/post-snackbar-after-creation";
import useBoolean from "@/hooks/use-boolean";

interface Props {
  page: IPage;
}
const PagePostViewTab = ({ page }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const auth = useBoolean();
  const postCreation = useBoolean();
  const snackbar = useBoolean();
  return (
    <div className="w-full ">
      <div className="w-full mt-5 mb-5">
        <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
      </div>
      {page?.posts.length === 0 ? (
        <div className="bg-white p-5 border rounded-3xl text-center">
          <h2 className="text-xl font-semibold">No Posts available</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {page?.posts.map((post, index) => (
            <PostCard post={post} userId={user?._id as string} key={index} />
          ))}
        </div>
      )}

      <AuthDialog dialog={auth} />
      <PostDialog dialog={postCreation} snackbar={snackbar} pageId={page._id} />
      <PostSnackbar snackbar={snackbar} />
    </div>
  );
};

export default PagePostViewTab;
