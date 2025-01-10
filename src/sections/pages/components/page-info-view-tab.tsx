"use client";

import React from "react";
import PostCard from "@/sections/home/post-card";
import { IPage } from "@/types/page";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  page: IPage;
}
const PageInfoViewTab = ({ page }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="w-full ">
      {page?.posts.length === 0 ? (
        <div className="bg-white p-5 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold">No Posts available</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {page?.posts.map((post, index) => (
            <PostCard post={post} userId={user?._id as string} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageInfoViewTab;
