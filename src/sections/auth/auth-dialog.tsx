/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from "@/layouts/paths";
import { BooleanState } from "@/types/utils";
import { Button, Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFTextField } from "@/components/react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/redux/reducers/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/reducers/auth/authSlice";
import { WEBSITE_LOGIN_PATH } from "@/constants/config-global";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

interface Props {
  dialog: BooleanState;
}

export const authLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" }),
});

const AuthDialog = ({ dialog }: Props) => {
  const methods = useForm({
    resolver: zodResolver(authLoginSchema),
  });

  const dispatch = useAppDispatch();

  const [logIn, { isLoading }] = useLoginMutation();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg("");
      const response = await logIn({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response?.data?.accessToken) {
        dispatch(setToken(response?.data?.accessToken));
        localStorage?.setItem("accessToken", response?.data?.accessToken);
        toast.success("User login successfully!");
        // router.push(returnTo || WEBSITE_LOGIN_PATH);
        dialog.setFalse();
        reset();
      } else {
        setErrorMsg(response.message!);
        toast.error(response.message!);
      }
    } catch (error: any) {
      setErrorMsg(error.data.message);
      toast.error(error.data.message);
      console.log("erroe message", error);
    }
  });
  return (
    <Dialog open={dialog.value} onClose={dialog.setFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div
          className="max-w-sm w-full text-gray-600 space-y-5
       px-7 py-9 "
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              bgcolor: "#E5E7EB",
            }}
            onClick={dialog.setFalse}
          >
            <CloseIcon />
          </IconButton>
          <div className="text-center pb-8">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              See more on Fadako
            </h3>
          </div>
          <RHFTextField name="email" label="Email" type="email" />
          <RHFTextField name="password" label="Password" type="password" />

          <Link href={paths.auth.forgotPassword}>
            <h2 className="text-right pt-3 text-sm font-semibold text-blue-600 hover:underline">
              Forgotten password?
            </h2>
          </Link>

          <LoadingButton
            variant="contained"
            loading={isLoading}
            fullWidth
            type="submit"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Log in
          </LoadingButton>
          {/* <button
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
            onClick={() => signIn("google", { callbackUrl: paths.root })}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </button> */}

          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or
            </p>
          </div>
          <Button
            variant="contained"
            onClick={() => router.push(paths.auth.signup)}
            color="success"
            fullWidth
            sx={{
              textTransform: "capitalize",
            }}
          >
            Create account
          </Button>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default AuthDialog;
