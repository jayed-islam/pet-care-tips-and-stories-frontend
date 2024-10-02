/* eslint-disable @typescript-eslint/no-unused-vars */
import useBoolean from "@/hooks/use-boolean";
import { useGetAllPostsQuery } from "@/redux/reducers/post/postApi";
import { IPost } from "@/types/post";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCreationStatusSection from "../home/post-creation-status-section";
import PostSortCard from "./post-sort-card";

const PostsView = () => {
  const auth = useBoolean();
  const postCreation = useBoolean();

  // Page and posts state
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts with the current page
  const { data, isFetching } = useGetAllPostsQuery({ page });

  useEffect(() => {
    if (data?.data.posts) {
      const newPosts = data.data.posts;

      // If it's the first page, replace posts; otherwise, append the new posts
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }

      // Update total posts count and check if there are more posts to load
      setTotalPosts(data.data.meta.totalPosts);
      if (posts.length + newPosts.length >= data.data.meta.totalPosts) {
        setHasMore(false);
      }
    }
  }, [data, page, posts.length]);

  // Fetch more posts when scrolling
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 mt-7 z-0 flex-col-reverse lg:flex-row">
      <div>
        <div className="w-full pb-16">
          {isFetching && page === 1 ? (
            <div className="grid grid-cols-2 gap-5">
              {[...Array(10)].map((_, index) => (
                <div className="animate-pulse" key={index}>
                  <div className="bg-gray-300 h-56 w-full mb-3"></div>
                  <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
                  <div className="bg-gray-300 h-4 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMorePosts}
              hasMore={hasMore}
              loader={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(2)].map((_, index) => (
                    <div className="animate-pulse" key={index}>
                      <div className="bg-gray-300 h-56 w-full mb-3"></div>
                      <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
                      <div className="bg-gray-300 h-4 w-1/2"></div>
                    </div>
                  ))}
                </div>
              }
              endMessage={
                <p className="text-center text-gray-500">
                  No more posts available
                </p>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-11">
                {posts.map((post, index) => (
                  <PostSortCard post={post} key={index} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="text-center text-gray-500">No posts available</div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[23rem] sticky top-11">
        <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
      </div>
    </div>
  );
};

export default PostsView;
