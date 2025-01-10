/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Dialog, IconButton, Divider, Typography } from "@mui/material";
import { BooleanState } from "@/types/utils";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFTextField } from "@/components/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useCreatePageMutation } from "@/redux/reducers/page/pageApi";
import Image from "next/image";
import ImageIcon from "../../../../public/icons/image.png";

export const createPageSchema = z.object({
  name: z.string().min(1, "Page name is required"),
  description: z.string().optional(),
});

interface Props {
  dialog: BooleanState;
}

const CreatePageDialog = ({ dialog }: Props) => {
  const methods = useForm({
    resolver: zodResolver(createPageSchema),
  });

  const [createPage, { isLoading }] = useCreatePageMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!file) return;

    if (file.size > maxSize) {
      toast.error(`${file.name} exceeds the 2 MB size limit.`);
      return;
    }

    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the currently selected image
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!image) {
      toast.error("Please select a logo");
      return;
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    // Append each selected image
    if (image) {
      formData.append("file", image as File);
    }

    try {
      const res = await createPage(formData).unwrap();
      if (res.success) {
        toast.success("Page created successfully!");
        reset();
        dialog.setFalse();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message || "Failed to create page");
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="w-full relative p-5">
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
            <Typography variant="h6" fontWeight="bold">
              Create New Page
            </Typography>
          </div>

          <Divider />
          <div className="flex flex-col gap-3 mt-3">
            <RHFTextField name="name" label="Page Name" />
            <RHFTextField
              name="description"
              label="Page Description"
              multiline
              rows={3}
            />
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
                <h2 className="text-md font-semibold">Add logo</h2>
                <Image src={ImageIcon} alt="image icon" className="w-7" />
              </div>
            </label>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {image && (
                <div className="relative">
                  <Image
                    src={URL.createObjectURL(image as File)}
                    alt="image"
                    className="h-16 w-full object-cover rounded-md"
                    width={200}
                    height={200}
                  />
                  <button
                    onClick={() => handleRemoveImage()}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              )}
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
            Create Page
          </LoadingButton>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default CreatePageDialog;
