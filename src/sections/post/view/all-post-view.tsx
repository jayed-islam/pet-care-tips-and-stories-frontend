// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import useBoolean from "@/hooks/use-boolean";
// import { useGetAllPostsQuery } from "@/redux/reducers/post/postApi";
// import { IPost } from "@/types/post";
// import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import PostCreationStatusSection from "../home/post-creation-status-section";
// import PostSortCard from "./post-sort-card";

// const PostsView = () => {
//   const auth = useBoolean();
//   const postCreation = useBoolean();

//   // Page and posts state
//   const [page, setPage] = useState(1);
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   // Fetch posts with the current page
//   const { data, isFetching } = useGetAllPostsQuery({ page });

//   useEffect(() => {
//     if (data?.data) {
//       const newPosts = data.data.posts;

//       // If it's the first page, replace posts; otherwise, append the new posts
//       if (page === 1) {
//         setPosts(newPosts);
//       } else {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       }

//       // Update total posts count and check if there are more posts to load
//       setTotalPosts(data.data.meta.totalPosts);
//       if (posts.length === 0) {
//         setHasMore(false);
//       }
//     }
//   }, [data]);

//   // Fetch more posts when scrolling
//   const fetchMorePosts = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 mt-7 z-0 flex-col-reverse lg:flex-row">
//       <div className="flex-1">
//         <div className="w-full pb-16">
//           {isFetching && page === 1 && (
//             <div className="grid grid-cols-2 gap-5">
//               {[...Array(10)].map((_, index) => (
//                 <div className="animate-pulse" key={index}>
//                   <div className="bg-gray-300 h-56 w-full mb-3"></div>
//                   <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
//                   <div className="bg-gray-300 h-4 w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <InfiniteScroll
//             dataLength={totalPosts}
//             next={fetchMorePosts}
//             hasMore={hasMore}
//             loader={
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {[...Array(2)].map((_, index) => (
//                   <div className="animate-pulse" key={index}>
//                     <div className="bg-gray-300 h-56 w-full mb-3"></div>
//                     <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
//                     <div className="bg-gray-300 h-4 w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             }
//             endMessage={
//               <p className="text-center text-gray-500">
//                 No more posts available
//               </p>
//             }
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-11">
//               {posts.map((post, index) => (
//                 <PostSortCard post={post} key={index} />
//               ))}
//             </div>
//           </InfiniteScroll>
//         </div>
//       </div>

//       <div className="w-full lg:w-[23rem] sticky top-11">
//         <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
//       </div>
//     </div>
//   );
// };

// export default PostsView;
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useBoolean from "@/hooks/use-boolean";
import { useGetAllPostsQuery } from "@/redux/reducers/post/postApi";
import { IPost } from "@/types/post";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCreationStatusSection from "../../home/post-creation-status-section";
import PostSortCard from "../../../layouts/common/post-sort-card";
import { Button, TextField } from "@mui/material";
import useDebounce from "@/hooks/use-debounce";
import AuthDialog from "../../auth/auth-dialog";
import PostDialog from "../post-create-dialog";

const PostsView = () => {
  const auth = useBoolean();
  const postCreation = useBoolean();

  // Page and posts state
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = useDebounce(searchTerm, 500);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch posts with the current page
  const { data, isFetching } = useGetAllPostsQuery({
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
    setPage(1); // Reset to the first page
    setPosts([]); // Clear existing posts
    setHasMore(true); // Reset hasMore to true
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page on search
    setPosts([]); // Clear existing posts
    setHasMore(true); // Reset hasMore to true
  };

  return (
    <>
      <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 mt-7 z-0 flex-col-reverse lg:flex-row">
        <div className="flex-1">
          <div className="w-full pb-16">
            {isFetching && page === 1 && (
              <div className="grid grid-cols-2 gap-5">
                {[...Array(10)].map((_, index) => (
                  <div className="animate-pulse" key={index}>
                    <div className="bg-gray-300 h-56 w-full mb-3"></div>
                    <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/2"></div>
                  </div>
                ))}
              </div>
            )}
            <InfiniteScroll
              dataLength={posts.length} // Update dataLength to reflect currently loaded posts
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
          </div>
        </div>

        <div className="w-full lg:w-[23rem] sticky top-11">
          <PostCreationStatusSection dialog={auth} postDialog={postCreation} />
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              mt: 3,
              borderRadius: 3,
            }}
          />

          <div className="flex gap-3 mt-5 border p-3">
            <Button
              fullWidth
              variant={
                selectedCategories.includes("66fa38dfae27dd09c8f012bd")
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              onClick={() => handleCategoryToggle("66fa38dfae27dd09c8f012bd")}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Tips
            </Button>
            <Button
              fullWidth
              variant={
                selectedCategories.includes("66fa3bd77dc9d17e683597c4")
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              onClick={() => handleCategoryToggle("66fa3bd77dc9d17e683597c4")}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Stories
            </Button>
          </div>
        </div>
      </div>
      <AuthDialog dialog={auth} />
      <PostDialog dialog={postCreation} />
    </>
  );
};

export default PostsView;
