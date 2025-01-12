import React, { useState } from "react";
import { Popover, IconButton } from "@mui/material";
import configNavs from "./config-nav";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/reducers/auth/authSlice";
import { paths } from "../paths";

const AdminProfileDropdown = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (route: string) => {
    router.push(route);
    handlePopoverClose();
  };

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push(paths.auth.login);
  };

  return (
    <div className="relative">
      <IconButton onClick={handlePopoverOpen}>
        <img
          src={user?.profilePicture ?? "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </IconButton>

      {/* MUI Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="z-10"
      >
        <div className="bg-white shadow-lg rounded-md w-48 p-2">
          {/* Navigation Items */}
          {configNavs.map((nav) => (
            <div
              key={nav.title}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => handleItemClick(nav.path)}
            >
              <div className="mr-2">{nav.icon}</div>
              <span>{nav.title}</span>
            </div>
          ))}

          {/* Logout Button */}
          <div
            className="mt-2 text-red-600 flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default AdminProfileDropdown;
