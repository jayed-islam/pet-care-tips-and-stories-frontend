import { useDeleteCommentMutation } from "@/redux/reducers/comment/commentApi";
import { IComment } from "@/types/comment";
import { Delete } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  comment: IComment;
}

const PostComentItem = ({ comment }: Props) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await deleteComment({
        commentId,
      }).unwrap();

      if (response.success) {
        toast.success("Comment deleted successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete the comment");
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <div className="flex items-start relative mb-5">
      <Image
        height={100}
        width={100}
        src={comment.author.profilePicture ?? "https://via.placeholder.com/40"}
        alt="ald"
        className="bg-gray-200 rounded-full w-10 h-10 mr-3"
      />
      <div className="flex-1 bg-gray-100 px-5 pt-2 pb-5 rounded-lg">
        {comment.content}
      </div>
      <IconButton
        sx={{
          position: "absolute",
          bottom: 0,
          right: 5,
        }}
        onClick={() => handleDeleteComment(comment._id)}
      >
        {isLoading ? <CircularProgress size={20} /> : <Delete />}
      </IconButton>
    </div>
  );
};

export default PostComentItem;
