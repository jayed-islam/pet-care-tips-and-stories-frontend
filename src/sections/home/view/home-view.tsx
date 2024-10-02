"use client";

import React from "react";
import PostCreationStatusSection from "../post-creation-status-section";
import useBoolean from "@/hooks/use-boolean";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/post/post-create-dialog";
import { useGetHomePostsQuery } from "@/redux/reducers/post/postApi";
import { IPost } from "@/types/post";
import { showTitle } from "@/utils/take-first-element";
import BlogPostCardList from "../home-blog-latest-post";
import BlogPostCard from "../blog-post-card";
import { Button } from "@mui/material";
import Link from "next/link";
import { paths } from "@/layouts/paths";

const HomeView = () => {
  const auth = useBoolean();
  const postCreation = useBoolean();

  // Fetch posts with the current page
  const { data, isLoading } = useGetHomePostsQuery({ page: 1 });

  return (
    <div className="h-full w-full">
      <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 mt-7 z-0 flex-col-reverse lg:flex-row">
        <div className="flex-1">
          {isLoading ? (
            <div className="w-full">
              <div className="animate-pulse mb-4">
                <div className="h-56 md:h-64 lg:h-[25rem] bg-gray-200 w-full"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="bg-gray-200 h-20 w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full mb-16">
              {data?.data && data.data.posts.length > 0 ? (
                <>
                  <BlogPostCard post={data.data.posts[0]} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
                    {data.data.posts.slice(1, 5).map((post, index) => (
                      <div
                        key={index}
                        className="flex items-start flex-col gap-2 group cursor-pointer"
                      >
                        <img
                          src={post.imageUrls[0]}
                          alt="post"
                          className="h-20 w-full object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-semibold line-clamp-2 overflow-ellipsis leading-4 group-hover:underline group-hover:text-blue-600 duration-300 transition-all">
                            {showTitle(post.content)}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  No posts available
                </div>
              )}
            </div>
          )}

          <div className="">
            <div className="border-b-2 border-gray-200 pb-3 mb-7">
              <h2 className="text-2xl font-semibold">Latest Posts</h2>
            </div>
            <BlogPostCardList
              latestPosts={data?.data.latestPosts as IPost[]}
              isLoading={isLoading}
            />

            <div className="flex items-center justify-center mb-16">
              <Link href={paths.post.root}>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  See more post
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[23rem] sticky top-11 z-20">
          <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
        </div>
      </div>
      <AuthDialog dialog={auth} />
      <PostDialog dialog={postCreation} />
    </div>
  );
};

export default HomeView;
