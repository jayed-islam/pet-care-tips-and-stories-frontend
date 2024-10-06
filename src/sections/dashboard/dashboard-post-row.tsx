/* eslint-disable @typescript-eslint/no-explicit-any */
// PostRow.tsx
import React from "react";
import { TableCell, TableRow, Button, CircularProgress } from "@mui/material";
import { IPost } from "@/types/post";
import { showTitle } from "@/utils/take-first-element";
import { useToggleUpdatePostStatusMutation } from "@/redux/reducers/post/postApi";
import toast from "react-hot-toast";
interface PostRowProps {
  post: IPost;
}

const PostRow: React.FC<PostRowProps> = ({ post }) => {
  const [updateStatusToggle, { isLoading: isUpdating }] =
    useToggleUpdatePostStatusMutation();

  const togglePublishStatus = async (postId: string) => {
    try {
      const res = await updateStatusToggle({ id: postId }).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error("Failed to update post status:", error);
      toast.error(error.data.message);
    }
  };

  return (
    <TableRow key={post._id}>
      <TableCell>{showTitle(post.content).slice(0, 35)}...</TableCell>
      <TableCell>{post.author.name}</TableCell>
      <TableCell>{post.author.role}</TableCell>
      <TableCell>{post.category.name}</TableCell>
      <TableCell>{post.upvotes.length}</TableCell>
      <TableCell>{post.downvotes.length}</TableCell>
      <TableCell>{post.comments.length}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color={post.isPublished ? "secondary" : "primary"}
          onClick={() => togglePublishStatus(post._id)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <CircularProgress size={24} color="inherit" />
          ) : post.isPublished ? (
            "Unpublish"
          ) : (
            "Publish"
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;
