/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container, Paper, Divider } from "@mui/material";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFTextField } from "@/components/react-hook-form";
import Link from "next/link";
import { paths } from "@/layouts/paths";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/reducers/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "@/redux/reducers/auth/authSlice";
import toast from "react-hot-toast";
import { WEBSITE_LOGIN_PATH } from "@/constants/config-global";
import { LoadingButton } from "@mui/lab";

export const authLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" }),
});

const LoginPageView = () => {
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
        router.push(returnTo || WEBSITE_LOGIN_PATH);
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
    <div className="w-full h-screen flex items-center justify-center bg-[#F0F2F5]">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Container component="main" maxWidth="xs">
          <Link href={paths.root}>
            <h2 className="text-4xl font-bold text-center">Eyebook</h2>
          </Link>
          <Paper
            elevation={3}
            sx={{
              mt: 3,
            }}
          >
            <div>
              <div className="p-3">
                <h2 className="text-xl font-semibold text-center">
                  Log in to fadako
                </h2>
              </div>
              <Divider />
              <div className="px-4 py-5 gap-3 w-full">
                <RHFTextField
                  name="email"
                  label="Email"
                  type="email"
                  sx={{
                    mb: 3,
                  }}
                />
                <RHFTextField
                  name="password"
                  label="Password"
                  type="password"
                />

                <div className="flex items-center justify-center mt-5 mb-5">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    color="primary"
                    loading={isLoading}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Log in
                  </LoadingButton>
                </div>

                <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
                  <Link href={paths.auth.forgotPassword}>
                    <h2 className="text-center  text-md  text-blue-600 hover:underline">
                      Forgotten password?
                    </h2>
                  </Link>
                  <Link href={paths.auth.signup}>
                    <h2 className="text-center  text-md text-blue-600 hover:underline">
                      Sign up for fadako
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          </Paper>
        </Container>
      </FormProvider>
    </div>
  );
};

export default LoginPageView;
