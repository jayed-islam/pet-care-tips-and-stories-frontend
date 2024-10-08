/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from "react-icons/fa";
import { IPost } from "@/types/post";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, IconButton } from "@mui/material";
import {
  useMakePaymentForPremiumPostMutation,
  useVoteAPostMutation,
} from "@/redux/reducers/post/postApi";
import useBoolean from "@/hooks/use-boolean";
import UserProfileForPost from "./user-info-section";
import RenderImageLayout from "./render-image-for-post";
import PostWithCommentDialog from "./post-with-comment.dialog";
import { useAppSelector } from "@/redux/hooks";
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationDialog from "../profile/delete-my-post";
import UpdatePostDialog from "../profile/update-post-view-dialog";
import { hasPurchasedPost } from "@/redux/reducers/post/postSlice";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import AuthDialog from "../auth/auth-dialog";
import toast from "react-hot-toast";

interface Props {
  post: IPost;
  userId: string;
  isMyProfile?: boolean;
}

const PostCard = ({ post, userId, isMyProfile = false }: Props) => {
  const [seeMore, setSeeMore] = useState(false);
  const commentDialog = useBoolean();
  const deletePostDialog = useBoolean();
  const updatePostDialog = useBoolean();
  const auth = useBoolean();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const isPurchased = useAppSelector((state) =>
    hasPurchasedPost(state, post._id)
  );

  // Local vote states
  const [likeCount, setLikeCount] = useState(post.upvotes.length);
  const [dislikeCount, setDislikeCount] = useState(post.downvotes.length);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);
  const characterLimit = 100;

  useEffect(() => {
    // Check if the current user has voted on the post
    if (post.upvotes.includes(userId)) {
      setUserVote("upvote");
    } else if (post.downvotes.includes(userId)) {
      setUserVote("downvote");
    }
  }, [post.upvotes, post.downvotes, userId]);

  const [votePost] = useVoteAPostMutation();

  const [makePayment, { isLoading }] = useMakePaymentForPremiumPostMutation();

  const handleVoteOnPost = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      toast.error("You need to be logged in to vote.");
      return;
    }

    // If already upvoted and clicking downvote
    if (userVote === "upvote" && voteType === "downvote") {
      setLikeCount((prev) => prev - 1);
      setDislikeCount((prev) => prev + 1);
      setUserVote("downvote");
    }
    // If already downvoted and clicking upvote
    else if (userVote === "downvote" && voteType === "upvote") {
      setDislikeCount((prev) => prev - 1);
      setLikeCount((prev) => prev + 1);
      setUserVote("upvote");
    }
    // If clicking the same vote again, remove the vote
    else if (userVote === voteType) {
      if (voteType === "upvote") {
        setLikeCount((prev) => prev - 1);
      } else {
        setDislikeCount((prev) => prev - 1);
      }
      setUserVote(null);
    }
    // If voting for the first time
    else {
      if (voteType === "upvote") {
        setLikeCount((prev) => prev + 1);
        setUserVote("upvote");
      } else {
        setDislikeCount((prev) => prev + 1);
        setUserVote("downvote");
      }
    }

    // API call to vote
    try {
      const res = await votePost({ postId: post._id, voteType }).unwrap();
      if (res.success) {
        console.log(res.message);
      } else {
        console.log(res.message);
      }
    } catch (error: any) {
      console.log(error.data.message);
    }
  };

  const handleMakePayment = async () => {
    try {
      const res = await makePayment({
        postId: post._id,
        amount: post.price ? Number(post.price) : 51,
      }).unwrap();
      if (res.success) {
        console.log(res.message);
        router.push(res.data.payment_url);
      } else {
        console.log(res.message);
      }
    } catch (error: any) {
      console.log(error.data.message);
    }
  };

  const isContentLong = post.content.length > characterLimit;

  const renderContent = () => {
    if (isContentLong && !seeMore) {
      return (
        <ReactQuill
          value={`${post.content.slice(0, characterLimit)}...`}
          readOnly={true}
          theme="bubble"
          className="p-0 m-0"
        />
      );
    }

    // Otherwise, show the full content
    return <ReactQuill value={post.content} readOnly={true} theme="bubble" />;
  };


  return (
    <>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <UserProfileForPost post={post} />
          {isMyProfile && (
            <div className="flex items-center gap-3">
              <IconButton onClick={deletePostDialog.setTrue}>
                <Delete />
              </IconButton>
              <IconButton onClick={updatePostDialog.setTrue}>
                <Edit />
              </IconButton>
            </div>
          )}
        </div>

        <div className="text-gray-700">
          {renderContent()}
          {isContentLong &&
            (!isMyProfile && post.isPremium && !isPurchased ? (
              <div className="relative h-20 w-full">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-black text-white">
                  <p>This content is premium. Pay to read more.</p>
                  {!user ? (
                    <LoadingButton
                      size="small"
                      variant="contained"
                      color="primary"
                      loading={isLoading}
                      sx={{
                        textTransform: "capitalize",
                        mt: 1,
                      }}
                      onClick={auth.setTrue}
                    >
                      Login then pay to read
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      size="small"
                      variant="contained"
                      color="primary"
                      loading={isLoading}
                      sx={{
                        textTransform: "capitalize",
                        mt: 1,
                      }}
                      onClick={handleMakePayment}
                    >
                      Pay to Read
                    </LoadingButton>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSeeMore(!seeMore)}
                className={`text-blue-500 hover:underline text-sm`}
              >
                {seeMore ? "Show Less" : "Show More"}
              </button>
            ))}
        </div>

        {/* Media (Images with Smart Layout) */}
        <RenderImageLayout post={post} />

        {/* Reaction/Comments/Share Count */}
        <div className="mt-4 flex justify-between text-gray-700 text-sm">
          <div>
            {likeCount} Upvotes . {dislikeCount} Downvotes
          </div>
          <div
            className="hover:underline cursor-pointer"
            onClick={commentDialog.setTrue}
          >
            {post.comments.length} Comments
          </div>
        </div>

        {/* Like, Comment, and Share buttons */}
        <div className="flex justify-between items-center mt-4 border-t border-gray-200 pt-2">
          <div className="flex items-center gap-3">
            <Button
              startIcon={<FaThumbsUp />}
              size="small"
              onClick={() => handleVoteOnPost("upvote")}
              sx={{
                textTransform: "capitalize",
                color: userVote === "upvote" ? "blue" : "gray",
              }}
            >
              Upvote
            </Button>
            <Button
              startIcon={<FaThumbsDown />}
              size="small"
              onClick={() => handleVoteOnPost("downvote")}
              sx={{
                textTransform: "capitalize",
                color: userVote === "downvote" ? "blue" : "gray",
              }}
            >
              Downvote
            </Button>
          </div>

          <Button
            onClick={commentDialog.setTrue}
            startIcon={<FaComment />}
            size="small"
            sx={{
              textTransform: "capitalize",
              color: "gray",
            }}
          >
            Comment
          </Button>

          <button className="lg:flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-all duration-200 hidden  ">
            <FaShare className="text-xl" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
      {commentDialog.value && (
        <PostWithCommentDialog dialog={commentDialog} post={post} />
      )}

      <ConfirmationDialog
        onClose={deletePostDialog.setFalse}
        open={deletePostDialog.value}
        postId={post._id}
      />

      {updatePostDialog.value && (
        <UpdatePostDialog dialog={updatePostDialog} post={post} />
      )}

      <AuthDialog dialog={auth} />
    </>
  );
};

export default PostCard;
