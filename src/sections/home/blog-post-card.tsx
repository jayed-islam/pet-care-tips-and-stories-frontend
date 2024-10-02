import { paths } from "@/layouts/paths";
import { IPost } from "@/types/post";
import { formatDate } from "@/utils/format-time";
import { showTitle } from "@/utils/take-first-element";
import Link from "next/link";
import React from "react";

interface Props {
  post: IPost;
}

const BlogPostCard = ({ post }: Props) => {
  const firstElementText = showTitle(post.content);
  return (
    <div className="relative overflow-hidden   transition-transform duration-300 transform z-10">
      <img
        src={post.imageUrls[0]}
        alt="Blog Post"
        className="w-full h-56 md:h-[20rem] lg:h-[25rem] object-cover transition-all duration-500 hover:scale-105 "
      />
      <div className="bg-black bg-opacity-30 inset-0 absolute"></div>
      <div className="absolute bottom-0 left-0 p-5">
        <div className=" bg-blue-600 text-white px-3 py-2 text-xs font-semibold w-min">
          {post.category.name}
        </div>
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 overflow-ellipsis mt-3">
            {firstElementText}
          </h2>
          <Link
            href={paths.root}
            className="mt-5 text-gray-200 text-xs font-semibold uppercase flex items-center gap-2 group"
          >
            {post.author.profilePicture && (
              <img
                src={post.author.profilePicture}
                alt=""
                className="h-6 w-6 rounded-full border"
              />
            )}
            <span className="group-hover:underline">
              {post.author.name ?? "Unnamed user"}
            </span>{" "}
            - <span>{formatDate(post.createdAt.toString())}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
