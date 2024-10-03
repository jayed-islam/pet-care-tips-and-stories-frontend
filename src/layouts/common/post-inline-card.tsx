import { IPost } from "@/types/post";
import { showTitle } from "@/utils/take-first-element";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { paths } from "../paths";
import { formatDate } from "@/utils/format-time";

interface Props {
  post: IPost;
  cls?: string;
}

const PostInlineCard = ({ post, cls = "text-white" }: Props) => {
  return (
    <div className="flex items-start gap-4 border-b border-gray-800 mb-5 pb-3">
      <div className="w-24 h-16">
        <Image
          src={post.imageUrls[0]}
          alt="post"
          className="h-full w-full object-cover rounded"
          height={100}
          width={100}
        />
      </div>
      <div className="flex-1">
        {post.isPremium ? (
          <h2
            className={`text-sm font-semibold line-clamp-2 overflow-ellipsis  hover:text-blue-600 transition-all duration-300 hover:underline ${cls}`}
          >
            {showTitle(post.content)}
          </h2>
        ) : (
          <Link
            href={`${paths.post.root}/${post._id}`}
            className={`text-sm font-semibold line-clamp-2 overflow-ellipsis  hover:text-blue-600 transition-all duration-300 hover:underline ${cls}`}
          >
            {showTitle(post.content)}
          </Link>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {formatDate(post.createdAt.toString())}
        </p>
      </div>
    </div>
  );
};

export default PostInlineCard;
