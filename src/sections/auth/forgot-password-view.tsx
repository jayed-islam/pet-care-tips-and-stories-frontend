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
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useForgotPasswordMutation } from "@/redux/reducers/auth/authApi";

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
});

const ForgotPasswordPageView = () => {
  const methods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg("");
      const response = await forgotPassword({
        email: data.email,
      }).unwrap();

      if (response?.success) {
        toast.success("Password reset link sent to your email!");
        reset();
      } else {
        setErrorMsg(response.message!);
        toast.error(response.message!);
      }
    } catch (error: any) {
      setErrorMsg(error.data.message);
      toast.error(error.data.message);
    }
  });

  return (
    <div className="w-full h-screen  bg-[#F0F2F5]">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            pt: 15,
          }}
        >
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
                  Forgot your password?
                </h2>
                <p className="text-center">
                  Enter your email to reset your password
                </p>
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
                    Send reset link
                  </LoadingButton>
                </div>

                <div className="flex items-center justify-center">
                  <Link href={paths.auth.login}>
                    <h2 className="text-center  text-md  text-blue-600 hover:underline">
                      Back to login
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

export default ForgotPasswordPageView;
