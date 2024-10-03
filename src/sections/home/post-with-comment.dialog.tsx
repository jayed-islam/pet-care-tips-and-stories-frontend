/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
} from "@mui/material";
import { BooleanState } from "@/types/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/redux/hooks";
import { FaGlobeAsia } from "react-icons/fa";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ImageIcon from "../../../public/icons/image.png";
import Image from "next/image";
import { useCreatePostMutation } from "@/redux/reducers/post/postApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFSelect } from "@/components/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { IPost } from "@/types/post";
import { useAddCommentMutation } from "@/redux/reducers/comment/commentApi";
import { IUser } from "@/types/auth";
import UserProfileForPost from "./user-info-section";

export const commentSchema = z.object({
  content: z
    .string({ required_error: "Comment is required" })
    .min(1, "Comment cannot be empty"),
});

interface Props {
  dialog: BooleanState;
  post: IPost;
  user: IUser;
}

const PostWithCommentDialog = ({ dialog, post, user }: Props) => {
  const methods = useForm({
    resolver: zodResolver(commentSchema),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const [addComment] = useAddCommentMutation();

  // Determine if the user has already commented on the post
  const existingComment = post.comments.find(
    (comment) => comment.author === user?._id
  );

  useEffect(() => {
    if (existingComment) {
      // If user already commented, set the form with existing comment content
      reset({ content: existingComment.content });
    }
  }, [existingComment, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addComment({
        author: user?._id as string,
        content: data.content,
        post: post._id,
      }).unwrap();
      if (response?.success) {
        toast.success(response.message);
        reset(); // Reset the form fields
      } else {
        toast.error(response.message!);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log("error message", error);
    }
  });
  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      fullWidth
      sx={{
        maxWidth: 700,
        margin: "auto",
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="w-full relative">
          <div className="fixed top-0 w-full shadow-md border-b">
            <IconButton
              sx={{
                position: "absolute",
                top: 7,
                right: 7,
                bgcolor: "#E5E7EB",
              }}
              onClick={dialog.setFalse}
            >
              <CloseIcon />
            </IconButton>

            <div className="text-center p-4">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                {post.author.name ?? "Unnammed user"} Post's
              </h3>
            </div>
          </div>

          {/* Profile Section */}

          <div>
            <UserProfileForPost post={post} />
          </div>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default PostWithCommentDialog;
