/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useUpdateUserProfileMutation } from "@/redux/reducers/user/userApi";

export const profileUpdateSchema = z.object({
  bio: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

interface Props {
  dialog: BooleanState;
}

const UpdateMyProfileDialog = ({ dialog }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const methods = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      bio: user?.bio,
      name: user?.name,
      address: user?.address,
      phone: user?.phone,
    },
  });

  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const payload: any = { userId: user?._id as string };

    // Only add fields to the payload if they have changed
    if (data.phone !== user?.phone) {
      payload.phone = data.phone;
    }
    if (data.address !== user?.address) {
      payload.address = data.address;
    }
    if (data.bio !== user?.bio) {
      payload.bio = data.bio;
    }
    if (data.name !== user?.name) {
      payload.name = data.name;
    }
    if (Object.keys(payload).length === 1) {
      // Only userId exists in the payload
      toast.error("No changes detected");
      return;
    }
    try {
      const res = await updateProfile(payload).unwrap();
      if (res.success) {
        toast.success(res.message);
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
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Update Profile
            </h3>
          </div>

          <Divider />
          <div className="flex flex-col gap-3">
            <RHFTextField name="name" label="My name" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="phone" label="Phone" />
            <RHFTextField name="bio" label="Profile bio" multiline rows={3} />
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
            Update Profile
          </LoadingButton>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default UpdateMyProfileDialog;
