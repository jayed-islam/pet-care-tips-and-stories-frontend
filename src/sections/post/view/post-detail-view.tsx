/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetSinglePostQuery } from "@/redux/reducers/post/postApi";
// import React from "react";

// interface Props {
//   id: string;
// }

// const PostDetailView = ({ id }: Props) => {
//   const { data } = useGetSinglePostQuery(id);
//   return (
//     <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 mt-7 z-0 flex-col-reverse lg:flex-row">
//       <div className="flex-1"></div>
//       <div className="w-full lg:w-[23rem] sticky top-11"></div>
//     </div>
//   );
// };

// export default PostDetailView;
"use client";

import React from "react";
import { useGetSinglePostQuery } from "@/redux/reducers/post/postApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { showTitle } from "@/utils/take-first-element";
import PostInlineCard from "@/layouts/common/post-inline-card";
import { Button, Divider } from "@mui/material";
import { paths } from "@/layouts/paths";
import PostAddCommentView from "../post-add-comment-view";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/auth";

interface Props {
  id: string;
}

const PostDetailView = ({ id }: Props) => {
  const { data, isLoading } = useGetSinglePostQuery(id);
  const { user } = useAppSelector((state) => state.auth);

  // Show a loading spinner while fetching the post
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#36D7B7" loading={isLoading} size={50} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Post not found</p>
      </div>
    );
  }

  const { post, relatedPosts } = data.data;
  const { content, imageUrls, author, comments, category } = post || {};

  return (
    <div className="bg-gray-100 py-11">
      <div className="flex items-start max-w-5xl mx-auto px-5 xl:px-0 gap-7 flex-col-reverse lg:flex-row">
        {/* Left section: Post details */}
        <div className="flex-1">
          <div className="bg-white p-5">
            <h1 className="text-3xl font-bold mb-7 line-clamp-2 overflow-ellipsis">
              {showTitle(content)}
            </h1>

            {/* Author info */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 group">
                <Image
                  src={author.profilePicture || "/default-profile.png"}
                  alt={author.name}
                  width={50}
                  height={50}
                  className="rounded-full h-16 w-16 border-2 border-blue-600"
                />
                <div>
                  <Link
                    href={paths.root}
                    className="font-semibold group-hover:underline"
                  >
                    {author.name ?? "Unammed user"}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {author.followers ?? 0} Followers
                  </p>
                </div>
              </div>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Follow
              </Button>
            </div>

            {/* Post images */}
            {imageUrls && imageUrls.length > 0 && (
              <div className="mb-6">
                <Image
                  src={imageUrls[0]}
                  alt={`Post Image1`}
                  width={800}
                  height={400}
                  className=" h-56 md:h-64 lg:h-96 border shadow-md object-cover w-full"
                />
                {imageUrls.length > 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                    {imageUrls
                      .slice(1, imageUrls.length)
                      .map((img: string, index: number) => (
                        <Image
                          key={index}
                          src={img}
                          alt={`Post Image ${index + 1}`}
                          width={800}
                          height={400}
                          className="object-cover w-full"
                        />
                      ))}
                  </div>
                )}
              </div>
            )}

            <div className="mb-6">
              <ReactQuill value={content} readOnly={true} theme="bubble" />
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold pb-1">Comments</h2>
              <Divider />
              {comments && comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow"
                    >
                      <p className="text-gray-800">{comment.content}</p>
                      <p className="text-sm text-gray-500">
                        - {comment.author}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <p>No comments yet.</p>
                  <PostAddCommentView post={post} user={user as IUser} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right section: Related posts */}
        <div className="w-full lg:w-[23rem] sticky top-11 bg-white">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
            <div className="space-y-4">
              {relatedPosts && relatedPosts.length > 0 ? (
                relatedPosts.map((relatedPost, index: number) => (
                  <PostInlineCard
                    post={relatedPost}
                    key={index}
                    cls="text-black"
                  />
                ))
              ) : (
                <p>No related posts available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailView;
