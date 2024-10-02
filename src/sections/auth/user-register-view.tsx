/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useRegisterMutation } from "@/redux/reducers/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

const authSignupSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" }),
});

const SignupPageView = () => {
  const methods = useForm({
    resolver: zodResolver(authSignupSchema),
  });

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg("");
      const response = await register({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response?.data) {
        toast.success("User login successfully!");
        router.push(paths.auth.login);
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
            <h2 className="text-4xl font-bold text-center">Fadako</h2>
          </Link>
          <Paper
            elevation={3}
            sx={{
              mt: 3,
            }}
          >
            <div>
              <div className="p-3">
                <h2 className="text-2xl font-bold text-center">
                  Create a new account
                </h2>
                <h3 className="text-sm text-gray-600 text-center">
                  It&apos;s quick and easy.
                </h3>
              </div>
              <Divider />
              <div className="px-4 py-5 gap-3 w-full">
                <RHFTextField
                  name="name"
                  label="Your name"
                  sx={{
                    mb: 3,
                  }}
                />
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

                <div className="flex items-center justify-center mt-5 mb-7">
                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Create account
                  </LoadingButton>
                </div>

                <Link href={paths.auth.login}>
                  <h2 className="text-center pt-3 text-md font-semibold text-blue-400">
                    Already have an account?
                  </h2>
                </Link>
              </div>
            </div>
          </Paper>
        </Container>
      </FormProvider>
    </div>
  );
};

export default SignupPageView;
