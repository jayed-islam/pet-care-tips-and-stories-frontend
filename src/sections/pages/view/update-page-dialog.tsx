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
import { useUpdatePageMutation } from "@/redux/reducers/page/pageApi";
import { IPage } from "@/types/page";

export const updatePageSchema = z.object({
  name: z.string().min(1, "Page name is required"),
  description: z.string().optional(),
});

interface Props {
  dialog: BooleanState;
  page: Partial<IPage>;
}

const UpdatePageDialog = ({ dialog, page }: Props) => {
  const methods = useForm({
    resolver: zodResolver(updatePageSchema),
    defaultValues: {
      ...page,
    },
  });

  const [updatePage, { isLoading }] = useUpdatePageMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updatePage({
        body: data,
        id: page._id as string,
      }).unwrap();
      if (res.success) {
        toast.success("Page updated successfully!");
        reset();
        window?.location?.reload();
        dialog.setFalse();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message || "Failed to update page");
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
              Update Page
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
            Update Page
          </LoadingButton>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default UpdatePageDialog;
