/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetUserPostsQuery } from "@/redux/reducers/post/postApi";
import banner from "../../../../public/image/banner.jpg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import PostShimmerCard from "@/sections/home/post-card-shimmer";
import PostCard from "@/sections/home/post-card";
import { IPost } from "@/types/post";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/auth";
import { Button } from "@mui/material";
import UpdateMyProfileDialog from "./update-my-profile";
import useBoolean from "@/hooks/use-boolean";
import ProfilePictureUploader from "../../../layouts/profile/components/profile-photo-change";
import PostCreationStatusSection from "@/sections/home/post-creation-status-section";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/post/post-create-dialog";
import Link from "next/link";
import { paths } from "@/layouts/paths";

interface Props {
  id?: string;
}

const MyProfileView = ({ id }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isPurchasedDataViewOn, setIsPurchasedDataViewOn] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const updateProfileDialog = useBoolean();
  const auth = useBoolean();
  const postCreation = useBoolean();

  const { data: userPostsData, isLoading: isUserPostFetching } =
    useGetUserPostsQuery({
      page: page,
      userId: user?._id,
    });

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

  return (
    <div className="w-full">
      {/* <div className="w-full bg-white shadow border-b relative pb-16">
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
            <Link href={paths.account.purchasedPost}>
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                My Purchaed content
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 xl:px-0">
        <div className="flex items-start lg:gap-7 mt-7 z-0 lg:flex-row flex-col-reverse">
          <div className="lg:flex rounded-lg w-full lg:w-[23rem] lg:sticky lg:top-20 mb-5 lg:mb-0 bg-white shadow border p-5">
            <div>
              <h2 className="text-2xl font-semibold mb-4">User Info</h2>

              <div className="mb-3">
                <p className="text-gray-600 text-sm font-medium">User Type:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.userType || "Not provided"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-gray-600 text-sm font-medium">Name:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.name || "Not provided"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-gray-600 text-sm font-medium">Email:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.email || "Not provided"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-gray-600 text-sm font-medium">Phone:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.phone || "Not provided"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-gray-600 text-sm font-medium">Address:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.address || "Not provided"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-gray-600 text-sm font-medium">Bio:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.bio || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full">
        <div className="w-full mb-5">
          <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
        </div>
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
                  isMyProfile
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <UpdateMyProfileDialog dialog={updateProfileDialog} />
      <AuthDialog dialog={auth} />
      <PostDialog dialog={postCreation} />
    </div>
  );
};

export default MyProfileView;
