/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetUserPostsQuery } from "@/redux/reducers/post/postApi";
import { useGetSingleUserProfileQuery } from "@/redux/reducers/user/userApi";
import banner from "../../../../public/image/banner.jpg";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import PostShimmerCard from "@/sections/home/post-card-shimmer";
import PostCard from "@/sections/home/post-card";
import { IPost } from "@/types/post";
import { useAppSelector } from "@/redux/hooks";
import FollowButton from "../../../layouts/profile/components/follow-button";
import { IUser } from "@/types/auth";

interface Props {
  id: string;
}

const FadakoUserProfileView = ({ id }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { data: userProfileData, isFetching: isUserProfileFetching } =
    useGetSingleUserProfileQuery({
      userId: id,
    });
  const { data: userPostsData, isLoading: isUserPostFetching } =
    useGetUserPostsQuery(
      {
        page: page,
        userId: id,
      },
      { skip: isUserProfileFetching }
    );

  useEffect(() => {
    if (userProfileData) {
      setFollowerCount(userProfileData.data.followers.length);
    }
  }, [userProfileData]);

  useEffect(() => {
    if (userPostsData?.data) {
      const newPosts = userPostsData.data.posts;

      // If it's the first page, replace posts; otherwise, append the new posts
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => {
          const existingPostIds = new Set(prevPosts.map((post) => post._id)); // Assuming each post has a unique `id`
          const filteredNewPosts = newPosts.filter(
            (post) => !existingPostIds.has(post._id)
          ); // Filter out duplicates
          return [...prevPosts, ...filteredNewPosts]; // Append only new posts
        });
      }

      // Update total posts count and check if there are more posts to load
      setTotalPosts(userPostsData.data.meta.totalPosts);

      // Update hasMore based on whether the total posts loaded is less than the total available
      if (
        posts.length + newPosts.length >=
        userPostsData.data.meta.totalPosts
      ) {
        setHasMore(false);
      }
    }
  }, [userPostsData, page]);

  // Fetch more posts when scrolling
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFollowerChange = (change: number) => {
    setFollowerCount((prevCount) => prevCount + change); // Update follower count locally
  };

  if (isUserProfileFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

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

        <div className="max-w-5xl mx-auto -mt-11 flex items-center justify-center md:items-end md:justify-between flex-col md:flex-row">
          <div className="flex items-center md:items-end gap-5 flex-col md:flex-row ">
            <div className="relative h-32 w-32 rounded-full">
              <Image
                src={
                  userProfileData?.data.profilePicture ??
                  "https://via.placeholder.com/40"
                }
                alt="banner"
                height={100}
                width={100}
                className="h-32 w-32 rounded-full  border-2 border-blue-600 object-cover"
              />
              {userProfileData?.data.userType === "premium" && (
                <div className="h-5 w-5 rounded-full bg-blue-500 absolute -right-2 bottom-16"></div>
              )}
            </div>
            <div className="flex items-center flex-col md:items-start">
              <h2 className="text-2xl md:text-4xl font-semibold">
                {userProfileData?.data.name ?? "Unnamed user"}
              </h2>

              <div className="flex items-center gap-2">
                <h2 className="text-lg ">{followerCount} followers</h2>
                <p className="text-xl">.</p>
                <h2 className="text-lg ">
                  {userProfileData?.data.following.length} following
                </h2>
              </div>
            </div>
          </div>
          <FollowButton
            profile={userProfileData?.data as IUser}
            onFollowerChange={handleFollowerChange}
          />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 xl:px-0">
        <div className="flex items-start lg:gap-7 mt-7 z-0 lg:flex-row">
          <div className="hidden lg:flex rounded-lg w-full lg:w-[23rem] sticky top-20 bg-white shadow border p-5">
            <div>
              <h2 className="text-xl font-semibold">User info</h2>
              <p className="text-md font-semibold mt-3">
                User Type : {userProfileData?.data.userType}
              </p>
            </div>
          </div>
          <div className="lg:flex-1 w-full">
            {/* Show shimmer loading cards when fetching for the first page */}
            {isUserPostFetching && page === 1 && (
              <div className="flex flex-col w-full gap-5">
                {[...Array(10)].map((_, index) => (
                  <PostShimmerCard key={index} />
                ))}
              </div>
            )}

            {/* Check if there are no posts */}
            {!isUserPostFetching && posts.length === 0 && (
              <div className="flex justify-center items-center h-full">
                <div className="bg-white p-4 rounded-lg shadow-md w-full text-center">
                  <h2 className="text-gray-500 text-lg">No posts available</h2>
                  <p className="text-gray-400">
                    This user hasn&apos;t made any posts yet.
                  </p>
                </div>
              </div>
            )}

            {/* Infinite Scroll for posts */}
            {posts.length > 0 && (
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={
                  <div className="grid grid-cols-1 gap-3">
                    {[...Array(2)].map((_, index) => (
                      <PostShimmerCard key={index} />
                    ))}
                  </div>
                }
                endMessage={
                  <p className="text-center text-gray-500">
                    No more posts available
                  </p>
                }
              >
                <div className="flex flex-col gap-5 w-full">
                  {posts.map((post, index) => (
                    <PostCard
                      post={post}
                      key={index}
                      userId={user?._id as string}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FadakoUserProfileView;
