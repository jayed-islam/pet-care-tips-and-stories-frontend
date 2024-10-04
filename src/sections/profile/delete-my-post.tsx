/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDeletePostMutation } from "@/redux/reducers/post/postApi";
import toast from "react-hot-toast";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  postId: string; // ID of the post to delete
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  postId,
}) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      const response = await deletePost({ id: postId }).unwrap();

      toast.success(response.message || "Post deleted successfully!");
      onClose(); // Close the dialog after deletion
    } catch (error: any) {
      console.error("Failed to delete post:", error);

      // Show an error toast notification
      toast.error(
        error.data?.message || "Failed to delete the post. Please try again."
      ); // Adjust based on your API response structure
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <p>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          color="secondary"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
