/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  Divider,
  FormControlLabel,
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
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/redux/reducers/post/postApi";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { IPost } from "@/types/post";

export const authLoginSchema = z.object({
  isPremium: z.boolean(),
  category: z.string(),
});

interface Props {
  dialog: BooleanState;
  post: IPost;
}

const UpdatePostDialog = ({ dialog, post }: Props) => {
  const [value, setValue] = useState(post.content ?? "");
  const [visibility, setVisibility] = useState("public");
  const { user } = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(post.imageUrls || []);

  const methods = useForm({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      isPremium: post.isPremium || false,
      price: post.price || "",
      category: post.category._id,
    },
  });

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handleVisibilityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setVisibility(event.target.value as string);
  };

  // // Handle image selection
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || []);
  //   setImages((prevImages) => [...prevImages, ...files]);
  // };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 2 * 1024 * 1024;
    const validFiles: File[] = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds the 2 MB size limit.`);
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    }
  };

  // Remove an image from the list
  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  //   useEffect(() => {
  //     if (dialog.value) {
  //       setValue(post.content ?? "");
  //     }
  //   }, [post.content, dialog.value, post]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = methods;

  const isPremium = watch("isPremium");

  const onSubmit = handleSubmit(async (data) => {
    if (!value.trim()) {
      toast.error("Content cannot be empty!");
      return;
    }

    if (images.length === 0 && imageUrls.length === 0) {
      toast.error("Please add minimum 1 image");
      return;
    }

    // const payload = {
    //   content: value,
    //   author: user && (user?._id as string),
    //   category: data.category,
    // };

    const payload = {
      content: value,
      author: user?._id as string,
      category: data.category,
      isPremium: data.isPremium,
      imageUrls: [...imageUrls],
      price: data.price,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    // Append each selected image
    images.forEach((image, index) => {
      formData.append(`files`, image);
    });

    try {
      const res = await updatePost({ body: formData, id: post._id }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setImages([]);
        setImageUrls([]);
        setValue("");
        dialog.setFalse();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.error("Failed to create post", error);
    }
  });

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      fullWidth
      sx={{
        maxWidth: 600,
        margin: "auto",
      }}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="w-full relative">
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
              Update Post
            </h3>
          </div>

          <Divider />

          {/* Profile Section */}
          <div className="flex items-center px-5 pt-4">
            <Image
              src={
                user?.profilePicture ||
                "https://plus.unsplash.com/premium_photo-1666298862681-c993ceb7865e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              height={100}
              width={100}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-2 object-cover"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-sm mb-1 text-gray-900">
                {(user && user?.name) ?? "Eyebook"}
              </h2>
              <div className="relative">
                {/* Hidden select element */}
                <select
                  value={visibility}
                  onChange={handleVisibilityChange}
                  className="appearance-none bg-transparent absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>

                {/* Custom dropdown appearance */}
                <div className="flex items-center rounded bg-gray-200 px-1 cursor-pointer w-[5.5rem]">
                  <FaGlobeAsia className="text-gray-600 text-sm" />
                  <span className="ml-1 text-gray-800 text-xs font-semibold">
                    {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                  </span>
                  <ArrowDropDownIcon className="text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pt-4">
            <div className="h-48 lg:h-64 overflow-auto">
              <ReactQuill
                value={value}
                onChange={setValue}
                placeholder="What's on your mind?"
                className="react-quill h-52"
              />
            </div>
            <div className="flex items-center gap-3 w-full flex-col lg:flex-row mt-3 lg:mt-1 mb-5">
              <Controller
                name="isPremium"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FormControlLabel
                    sx={{
                      width: "100%",
                    }}
                    control={
                      <Checkbox
                        checked={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                      />
                    }
                    label="Is Premium?"
                  />
                )}
              />
              {isPremium && <RHFTextField name="price" label="Price" />}
            </div>
            <div className="flex items-center gap-3 w-full flex-col lg:flex-row mt-3 lg:mt-1">
              <label htmlFor="image" className="w-full">
                <div className="flex items-center justify-between border-2 border-gray-200 px-5 py-3 rounded-md cursor-pointer">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <h2 className="text-md font-semibold">Add to your post</h2>
                  <Image src={ImageIcon} alt="image icon" className="w-7" />
                </div>
              </label>
              <RHFSelect
                fullWidth
                label="Category"
                name="category"
                options={[
                  {
                    label: "Tips",
                    value: "66fa38dfae27dd09c8f012bd",
                  },
                  {
                    label: "Stories",
                    value: "66fa3bd77dc9d17e683597c4",
                  },
                ]}
              />
            </div>

            {/* Display Selected Images */}
            <div>
              <h2 className="text-lg font-semibold mb-2">New added images</h2>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Selected image ${index + 1}`}
                      className="h-16 w-full object-cover rounded-md"
                      width={200}
                      height={200}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-lg font-semibold mb-2">Current Images </h2>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {imageUrls?.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Selected image ${index + 1}`}
                      className="h-16 w-full object-cover rounded-md"
                      width={200}
                      height={200}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrls((prevUrls) =>
                          prevUrls.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              sx={{
                my: 2,
                textTransform: "capitalize",
              }}
            >
              Update Post
            </LoadingButton>
          </div>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default UpdatePostDialog;
