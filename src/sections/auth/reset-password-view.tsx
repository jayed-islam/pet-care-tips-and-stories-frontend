/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

const resetPasswordSchema = z
  .object({
    newPassword: z.string({ required_error: "New password is required" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Use useEffect to retrieve URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    setToken(params.get("token"));
  }, []);

  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FieldValues) => {
    // Assert the type of data
    const { newPassword, confirmPassword } = data as {
      newPassword: string;
      confirmPassword: string;
    };

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/reset-password`,
        { id, newPassword },
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        reset();
        window.location.href = "/auth/login";
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <TextField
              {...methods.register("newPassword")}
              type="password"
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.newPassword}
              helperText={
                errors.newPassword ? (errors.newPassword.message as string) : ""
              }
            />

            <TextField
              {...methods.register("confirmPassword")}
              type="password"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword
                  ? (errors.confirmPassword.message as string)
                  : ""
              }
            />
          </div>

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            sx={{ textTransform: "capitalize" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
