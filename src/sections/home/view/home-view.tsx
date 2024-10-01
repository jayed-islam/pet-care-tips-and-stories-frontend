"use client";

import React from "react";
import PostCreationStatusSection from "../post-creation-status-section";
import BlogPostCard from "../blog-post-card";
import useBoolean from "@/hooks/use-boolean";
import AuthDialog from "@/sections/auth/auth-dialog";
const HomeView = () => {
  // bg-[#F0F2F5]
  const auth = useBoolean();
  return (
    <div className="h-full w-full">
      <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 mt-7 z-0">
        <div className="flex-1">
          <BlogPostCard />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="flex items-start flex-col gap-2">
                <img
                  src="https://via.placeholder.com/50"
                  alt="post"
                  className="h-20 w-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold line-clamp-2 overflow-ellipsis">
                    Oil Rises as Investors Look Past Possible Reserve Releases
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="border-b-2 border-gray-200 pb-3 mb-7">
              <h2 className="text-2xl font-semibold">Latest Posts</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="flex items-start flex-col gap-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="post"
                    className="h-56 w-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2 overflow-ellipsis">
                      Oil Rises as Investors Look Past Possible Reserve Releases
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[23rem]">
          <PostCreationStatusSection dialog={auth} />
        </div>
      </div>
      <AuthDialog dialog={auth} />
    </div>
  );
};

export default HomeView;
