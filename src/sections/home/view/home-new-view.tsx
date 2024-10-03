"use client";

import React, { useEffect, useState } from "react";
import useBoolean from "@/hooks/use-boolean";
import AuthDialog from "@/sections/auth/auth-dialog";
import PostDialog from "@/sections/post/post-create-dialog";
import { useGetAllPostsQuery } from "@/redux/reducers/post/postApi";
import { IPost } from "@/types/post";
import useDebounce from "@/hooks/use-debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSortCard from "@/layouts/common/post-sort-card";
import PostCard from "../post-card";
import PostCreationStatusSection from "../post-creation-status-section";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PostShimmerCard from "../post-card-shimmer";
import { setPage } from "@/redux/reducers/post/postSlice";

const HomeView = () => {
  const auth = useBoolean();
  const postCreation = useBoolean();
  const { user } = useAppSelector((state) => state.auth);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useAppDispatch();

  const { searchTerm, selectedCategories, page } = useAppSelector(
    (state) => state.post
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isFetching, isLoading } = useGetAllPostsQuery({
    page,
    category: selectedCategories,
    search: debouncedSearchTerm,
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
    <div className="h-full max-w-xl mx-auto">
      <div className="w-full pb-16">
        <div className="w-full mb-5">
          <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
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
            <p className="text-center text-gray-500">No more posts available</p>
          }
        >
          <div className="flex flex-col gap-5 w-full">
            {posts.map((post, index) => (
              <PostCard post={post} key={index} userId={user?._id as string} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <AuthDialog dialog={auth} />
      <PostDialog dialog={postCreation} />
    </div>
  );
};

export default HomeView;
