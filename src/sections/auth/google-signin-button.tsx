/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleLoginMutation } from "@/redux/reducers/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/reducers/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { WEBSITE_LOGIN_PATH } from "@/constants/config-global";

const GoogleSignInButton = () => {
  const [googleAuthLogin] = useGoogleLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const handleSuccess = async (response: any) => {
    // console.log("Login Success:", response);

    const idToken = response.credential;
    const userInfo: any = jwtDecode(idToken);

    console.log("user", userInfo);

    const payload = {
      name: userInfo.name ?? "eyebook user",
      email: userInfo.email,
      ...(userInfo.picture && { picture: userInfo.picture }),
    };

    try {
      const response = await googleAuthLogin(payload).unwrap();
      if (response?.data?.accessToken) {
        dispatch(setToken(response?.data?.accessToken));
        localStorage?.setItem("accessToken", response?.data?.accessToken);
        toast.success("User login successfully!");
        router.push(returnTo || WEBSITE_LOGIN_PATH);
      } else {
        toast.error(response.message!);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleSignInButton;
