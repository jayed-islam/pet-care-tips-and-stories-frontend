"use client";

import React from "react";
import PostCard from "@/sections/home/post-card";
import { useAppSelector } from "@/redux/hooks";

const MyPurchasedPostView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="w-full ">
      {user?.purchasedPosts.length === 0 ? (
        <div className="bg-white p-5 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold">No Items Purchased</h2>
          <p className="text-gray-600 mt-2">
            You haven&lsquo;t purchased any posts yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {user?.purchasedPosts.map((post, index) => (
            <PostCard post={post} userId={user._id as string} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchasedPostView;
