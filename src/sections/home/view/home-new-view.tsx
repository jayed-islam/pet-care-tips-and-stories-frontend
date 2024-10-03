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
import { useAppSelector } from "@/redux/hooks";
import PostShimmerCard from "../post-card-shimmer";

const HomeView = () => {
  const auth = useBoolean();
  const postCreation = useBoolean();
  const { user } = useAppSelector((state) => state.auth);
  // Page and posts state
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = useDebounce(searchTerm, 500);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch posts with the current page
  const { data, isFetching, isLoading } = useGetAllPostsQuery({
    page,
    category: selectedCategories,
    search: searchParams,
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

      // Update total posts count and check if there are more posts to load
      setTotalPosts(data.data.meta.totalPosts);

      // Update hasMore based on whether the total posts loaded is less than the total available
      if (posts.length + newPosts.length >= data.data.meta.totalPosts) {
        setHasMore(false);
      }
    }
  }, [data, page]);

  // Fetch more posts when scrolling
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category); // Remove category
      } else {
        return [...prevCategories, category]; // Add category
      }
    });
    setPage(1);
    setPosts([]);
    setHasMore(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
    setPosts([]);
    setHasMore(true);
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
