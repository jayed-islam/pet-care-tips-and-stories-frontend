/* eslint-disable @typescript-eslint/no-explicit-any */
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { useAddCommentMutation } from "@/redux/reducers/comment/commentApi";
import { IUser } from "@/types/auth";
import { IPost } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
  user: IUser | null;
  post: IPost;
}

export const commentSchema = z.object({
  content: z
    .string({ required_error: "Comment is required" })
    .min(1, "Comment cannot be empty"),
});

const PostAddCommentView = ({ post, user }: Props) => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
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
    (comment) => comment.author._id === user?._id
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
        setShowForm(false); // Hide the form after submission
      } else {
        toast.error(response.message!);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log("error message", error);
    }
  });

  return (
    <div>
      {!showForm && !existingComment ? ( // Show "Add Comment" button if no comments
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Comment
        </button>
      ) : existingComment && !showForm ? ( // Show "Update Comment" button if user has commented
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded"
        >
          Update Comment
        </button>
      ) : null}

      {showForm && (
        <div className="mt-4">
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Write your comment..."
                  required
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message as string}</p>
            )}

            <div className="mt-2">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-red-500 text-white py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </FormProvider>
        </div>
      )}
    </div>
  );
};

export default PostAddCommentView;
