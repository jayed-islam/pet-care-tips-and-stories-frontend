import { IPost } from "@/types/post";
import React from "react";
import PostSortCard from "../../layouts/common/post-sort-card";

// Simulate a shimmer effect for loading state
const Shimmer = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-56 w-full mb-3"></div>
    <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
    <div className="bg-gray-300 h-4 w-1/2"></div>
  </div>
);

interface Props {
  latestPosts: IPost[]; // The posts data
  isLoading: boolean; // Loading state
}

const BlogPostCardList: React.FC<Props> = ({ latestPosts, isLoading }) => {
  return (
    <div className="w-full pb-16">
      {isLoading ? (
        // Show shimmer effect while loading
        <div className="grid grid-cols-2 gap-5">
          {[...Array(10)].map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      ) : latestPosts.length > 0 ? (
        // Show posts once loaded
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-11">
          {latestPosts.map((post, index) => (
            // <div key={post._id} className="flex items-start flex-col group">
            //   <div className="h-56 w-full overflow-hidden relative">
            //     <img
            //       src={post.imageUrls[0] || "https://via.placeholder.com/50"}
            //       className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500 cursor-pointer"
            //     />
            //     {post.isPremium && (
            //       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 cursor-not-allowed">
            //         <div className="text-white text-center p-4">
            //           <p className="text-lg font-semibold">Premium Content</p>
            //           <p className="text-sm">
            //             Upgrade your profile to see this content!
            //           </p>
            //         </div>
            //       </div>
            //     )}
            //   </div>
            //   <div className=" text-blue-600 text-xs uppercase font-bold mt-3">
            //     {post.category.name}
            //   </div>
            //   <div>
            //     {post.isPremium ? (
            //       <h2 className="text-md font-semibold line-clamp-2 overflow-ellipsis hover:cursor-not-allowed transition-all duration-300 mt-3">
            //         {showTitle(post.content)}
            //       </h2>
            //     ) : (
            //       <Link
            //         href={paths.root}
            //         className="text-md font-semibold line-clamp-2 overflow-ellipsis hover:text-blue-600 transition-all duration-300 mt-3"
            //       >
            //         {showTitle(post.content)}
            //       </Link>
            //     )}
            //   </div>
            //   <Link
            //     href={paths.root}
            //     className="mt-1 text-gray-500 text-xs font-semibold uppercase flex items-center gap-2 group"
            //   >
            //     {post.author.profilePicture && (
            //       <img
            //         src={post.author.profilePicture}
            //         alt=""
            //         className="h-3 w-3 rounded-full border"
            //       />
            //     )}
            //     <span className="group-hover:underline uppercase">
            //       By {post.author.name ?? "Unnamed user"}
            //     </span>{" "}
            //     -{" "}
            //     <span className="uppercase">
            //       {formatDate(post.createdAt.toString())}
            //     </span>
            //   </Link>
            // </div>
            <PostSortCard post={post} key={index} />
          ))}
        </div>
      ) : (
        // Show a message if no posts are available
        <div className="text-center text-gray-500">No posts available</div>
      )}
    </div>
  );
};

export default BlogPostCardList;
