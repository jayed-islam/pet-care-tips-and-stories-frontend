/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetUserPostsQuery } from "@/redux/reducers/post/postApi";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostShimmerCard from "@/sections/home/post-card-shimmer";
import PostCard from "@/sections/home/post-card";
import { IPost } from "@/types/post";
import { useAppSelector } from "@/redux/hooks";
import UpdateMyProfileDialog from "./update-my-profile";
import useBoolean from "@/hooks/use-boolean";
import PostCreationStatusSection from "@/sections/home/post-creation-status-section";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/profile/post-create-dialog";
import PostSnackbar from "../post-snackbar-after-creation";

interface Props {
  id?: string;
}

const MyProfileView = ({ id }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const snackbar = useBoolean();

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const updateProfileDialog = useBoolean();
  const auth = useBoolean();
  const postCreation = useBoolean();

  const { data: userPostsData, isFetching: isUserPostFetching } =
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
      <PostDialog dialog={postCreation} snackbar={snackbar} />
      <PostSnackbar snackbar={snackbar} />
    </div>
  );
};

export default MyProfileView;
