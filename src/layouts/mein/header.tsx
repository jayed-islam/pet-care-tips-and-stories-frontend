"use client";

import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "@/redux/hooks";
import ProfileDropDown from "../main/profile-menu-bar";

const Header = ({
  toggleLeftDrawer,
  toggleRightDrawer,
}: {
  toggleLeftDrawer: (open: boolean) => void;
  toggleRightDrawer: (open: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="fixed top-0 w-full bg-white py-3 shadow-md border-b z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open left drawer"
          onClick={() => toggleLeftDrawer(true)}
          className="lg:hidden"
        >
          <MenuIcon />
        </IconButton>

        <div className="text-2xl font-bold">Fadako</div>
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

          {user && user?.email && (
            <div className="hidden lg:block">
              <ProfileDropDown user={user} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
