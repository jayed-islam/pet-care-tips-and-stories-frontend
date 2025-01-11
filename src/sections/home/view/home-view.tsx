/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import useBoolean from "@/hooks/use-boolean";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/profile/post-create-dialog";
import { useGetAllPostsQuery } from "@/redux/reducers/post/postApi";
import { IPost } from "@/types/post";
import useDebounce from "@/hooks/use-debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "../post-card";
import PostCreationStatusSection from "../post-creation-status-section";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PostShimmerCard from "../post-card-shimmer";
import { setPage } from "@/redux/reducers/post/postSlice";
import PostSnackbar from "@/sections/profile/post-snackbar-after-creation";

const tabs = [
  { title: "For You", value: "forYou" },
  { title: "Premium", value: "premium" },
];

const HomeView = () => {
  const auth = useBoolean();
  const postCreation = useBoolean();
  const snackbar = useBoolean();
  const { user } = useAppSelector((state) => state.auth);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [activeTab, setActiveTab] = useState("forYou");

  const dispatch = useAppDispatch();

  const { searchTerm, selectedCategories, page } = useAppSelector(
    (state) => state.post
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isFetching } = useGetAllPostsQuery({
    page,
    category: selectedCategories,
    search: debouncedSearchTerm,
    ...(activeTab === "premium" && { isPremium: true }),
  });

  useEffect(() => {
    if (data?.data) {
      const newPosts = data.data.posts;

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

      // Update hasMore based on whether the total posts loaded is less than the total available
      if (posts.length + newPosts.length >= data.data.meta.totalPosts) {
        setHasMore(false);
      }
    }
  }, [data, page]);

  // Fetch more posts when scrolling
  const fetchMorePosts = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className="sm:pr-3">
      <div className="h-full w-full relative sm:border-r">
        {/* <div className="bg-white bg-opacity-30 backdrop-blur-lg h-16 w-full sticky top-0 border-b mt-2"></div> */}

        <div className="bg-white bg-opacity-30 backdrop-blur-lg h-12 sm:h-[4rem] w-full sticky top-[4.5rem] sm:top-0 border-b flex items-center justify-between z-50">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className="w-full h-full relative flex items-center justify-center cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveTab(tab.value)}
            >
              <h2
                className={`text-md text-center ${
                  activeTab === tab.value
                    ? "font-bold text-black"
                    : "text-gray-700 font-semibold"
                }`}
              >
                {tab.title}
              </h2>
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[4rem] h-1 bg-blue-500 rounded-sm "></div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full pb-16 px-3">
          <div className="w-full mb-5 mt-5">
            <PostCreationStatusSection
              dialog={auth}
              postDialog={postCreation}
            />
          </div>
          {isFetching && page === 1 && (
            <div className="flex flex-col w-full gap-5">
              {[...Array(10)].map((_, index) => (
                <PostShimmerCard key={index} />
              ))}
            </div>
          )}
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
        </div>
        <AuthDialog dialog={auth} />
        <PostDialog dialog={postCreation} snackbar={snackbar} />
        <PostSnackbar snackbar={snackbar} />
      </div>
    </div>
  );
};

export default HomeView;
