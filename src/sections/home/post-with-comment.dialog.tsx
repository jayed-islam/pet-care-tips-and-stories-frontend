/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
} from "@mui/material";
import { BooleanState } from "@/types/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { IPost } from "@/types/post";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentQuery,
} from "@/redux/reducers/comment/commentApi";
import { IUser } from "@/types/auth";
import UserProfileForPost from "./user-info-section";
import RenderImageLayout from "./render-image-for-post";
import Image from "next/image";
import { Delete, Send } from "@mui/icons-material";
import PostComentItem from "./post-comment-item";
import { useAppSelector } from "@/redux/hooks";
import { hasPurchasedPost } from "@/redux/reducers/post/postSlice";
import { LoadingButton } from "@mui/lab";
import { paths } from "@/layouts/paths";
import { useRouter } from "next/navigation";
import { useMakePaymentForPremiumPostMutation } from "@/redux/reducers/post/postApi";

export const commentSchema = z.object({
  content: z
    .string({ required_error: "Comment is required" })
    .min(1, "Comment cannot be empty"),
});

interface Props {
  dialog: BooleanState;
  post: IPost;
  isMyProfile?: boolean;
}

const PostWithCommentDialog = ({ dialog, post, isMyProfile }: Props) => {
  const [seeMore, setSeeMore] = useState(false);
  const characterLimit = 100;
  const methods = useForm({
    resolver: zodResolver(commentSchema),
  });
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const isPurchased = useAppSelector((state) =>
    hasPurchasedPost(state, post._id)
  );
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const [addComment, { isLoading }] = useAddCommentMutation();
  const { data, isFetching } = useGetCommentQuery({ postId: post._id });
  const [makePayment, { isLoading: isMakePaymentLoading }] =
    useMakePaymentForPremiumPostMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (!user) {
      toast.error("You need to be logged in to comment.");
      return;
    }

    try {
      const response = await addComment({
        author: user?._id as string,
        content: data.content,
        post: post._id,
      }).unwrap();
      if (response?.success) {
        toast.success(response.message);
        reset();
      } else {
        toast.error(response.message!);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log("error message", error);
    }
  });

  const isContentLong = post.content.length > characterLimit;
  const maxImagesToShow = 4;

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
          <div className="w-full shadow-md border-b">
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
                {post?.author.name ?? "Unnammed user"} Post&apos;s
              </h3>
            </div>
          </div>

          <div className="px-5 pb-7 pt-5">
            <UserProfileForPost post={post} />

            <div className="text-gray-700">
              {renderContent()}
              {/* {isContentLong && (
                <button
                  type="button"
                  onClick={() => setSeeMore(!seeMore)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {seeMore ? "Show Less" : "Show More"}
                </button>
              )} */}
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
                          onClick={() => router.push(paths.auth.login)}
                        >
                          Login then pay to read
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          size="small"
                          variant="contained"
                          color="primary"
                          loading={isMakePaymentLoading}
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

            <div className="mt-5">
              {isFetching ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="flex animate-pulse">
                      <div className="bg-gray-200 rounded-full w-10 h-10 mr-3"></div>
                      <div className="flex-1 bg-gray-300 p-9 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : data?.data.length === 0 ? (
                <div className="p-5 text-md font-semibold">
                  No comments found. add your comment!!!
                </div>
              ) : (
                data?.data.map((comment, idx) => (
                  <PostComentItem key={idx} comment={comment} />
                ))
              )}
            </div>
          </div>
          <DialogActions
            sx={{
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 1000,
              padding: "16px",
              boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-start gap-3 w-full relative">
              <Image
                alt="dd"
                src={user?.profilePicture || "https://via.placeholder.com/40"}
                height={100}
                width={100}
                className="h-11 w-11 rounded-full object-cover"
              />
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full px-3 py-2 outline-none border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Write your comment..."
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit();
                      }
                    }}
                  />
                )}
              />
              <IconButton
                type="submit"
                sx={{
                  position: "absolute",
                  right: 5,
                  bottom: 5,
                }}
              >
                {isLoading ? <CircularProgress size={30} /> : <Send />}
              </IconButton>
            </div>
          </DialogActions>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default PostWithCommentDialog;
