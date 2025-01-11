/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/reducers/post/postSlice";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { paths } from "../paths";
import Image from "next/image";
import logo from "../../../public/image/eyebook-logo.png";
import userLoo from "../../../public/image/user.jpg";
import { Avatar, Button } from "@mui/material";

const Header = ({
  toggleLeftDrawer,
}: {
  toggleLeftDrawer: (open: boolean) => void;
  toggleRightDrawer: (open: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 w-full z-50 sm:hidden">
      <div className="max-w-[78rem] mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-full bg-white py-2 px-5 shadow border-b">
          <Avatar
            onClick={() => toggleLeftDrawer(true)}
            src={user?.profilePicture ?? userLoo.src}
            alt="User Profile"
            sx={{ width: 40, height: 40 }}
          />
          <Link href={paths.root}>
            <Image src={logo} alt="fadako" className="w-11 rounded-full" />
          </Link>

          <Link href="/pages">
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "capitalize",
                borderRadius: "3rem",
              }}
              color="primary"
            >
              Pages
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
