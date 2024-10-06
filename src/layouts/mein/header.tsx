"use client";

import React, { ChangeEvent } from "react";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProfileDropDown from "../dashboard/profile-menu-bar";
import Link from "next/link";
import { paths } from "../paths";
import { setSearchTerm } from "@/redux/reducers/post/postSlice";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../public/image/logo.jpg";
import { IUser } from "@/types/auth";

const Header = ({
  toggleLeftDrawer,
  toggleRightDrawer,
}: {
  toggleLeftDrawer: (open: boolean) => void;
  toggleRightDrawer: (open: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.post);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="fixed top-0 w-full bg-white py-3 shadow-md border-b z-50">
      <div className="max-w-screen-2xl mx-auto px-5 flex items-center justify-between">
        <div>
          {/* <div className="lg:hidden">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open left drawer"
              onClick={() => toggleLeftDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div> */}
          <div className="flex items-center gap-3">
            <Link href={paths.root} className="hidden lg:flex">
              <Image
                src={logo}
                alt="fadako"
                className="h-11 w-11 rounded-full"
              />
            </Link>

            <Image
              onClick={() => toggleLeftDrawer(true)}
              src={logo}
              alt="fadako"
              className="h-11 w-11 rounded-full lg:hidden"
            />
            <div className="relative hidden md:flex">
              <FiSearch className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className=" pl-8 outline-none py-2 border border-gray-300 rounded-full bg-gray-100 w-[19rem]"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Link
            href={paths.root}
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold"
          >
            Eyebook
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="lg:hidden">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open right drawer"
              onClick={() => toggleRightDrawer(true)}
              className="lg:hidden"
            >
              <MenuIcon />
            </IconButton>
          </div>

          {user && user?.email ? (
            <div className="hidden lg:flex gap-5">
              {user.role === "admin" && (
                <Link href={paths.dashboard.root}>
                  <Button
                    sx={{
                      textTransform: "capitalize",
                    }}
                    variant="contained"
                  >
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <ProfileDropDown user={user as IUser} />
            </div>
          ) : (
            <div className="lg:flex items-center gap-3 hidden">
              <Link href={paths.auth.login}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href={paths.auth.signup}>
                <Button
                  color="success"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Create
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
