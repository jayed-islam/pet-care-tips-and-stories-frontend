/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Divider, IconButton } from "@mui/material";
import { BooleanState } from "@/types/utils";
import "react-quill/dist/quill.snow.css";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useUpdateUserByAdminMutation } from "@/redux/reducers/user/userApi";
import { IUser } from "@/types/auth";

export const profileUpdateSchema = z.object({
  status: z.string().optional(),
  role: z.string().optional(),
});

interface Props {
  dialog: BooleanState;
  userData: IUser;
}

const UpdateUserByAdminDialog = ({ dialog, userData }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const methods = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      role: userData?.role,
      status: userData?.status,
    },
  });

  const [updateUserByAdmin, { isLoading: isUpdateAdminLoading }] =
    useUpdateUserByAdminMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const payload: Partial<IUser> = { _id: userData?._id as string };

    // Only add fields to the payload if they have changed
    if (data.role !== userData?.role) {
      payload.role = data.role;
    }
    if (data.status !== userData?.status) {
      payload.status = data.status;
    }
    if (Object.keys(payload).length === 1) {
      // Only userId exists in the payload
      toast.error("No changes detected");
      return;
    }
    try {
      const res = await updateUserByAdmin(payload).unwrap();
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
              Update User Permission
            </h3>
          </div>

          <Divider />
          <div className="flex flex-col gap-3">
            <RHFSelect
              name="role"
              fullWidth
              label="ROle"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
              ]}
            />

            <RHFSelect
              fullWidth
              name="status"
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Blocked", value: "blocked" },
              ]}
            />
          </div>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={isUpdateAdminLoading}
            disabled={isUpdateAdminLoading}
            fullWidth
            size="large"
            sx={{
              my: 2,
              textTransform: "capitalize",
            }}
          >
            Update
          </LoadingButton>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default UpdateUserByAdminDialog;
