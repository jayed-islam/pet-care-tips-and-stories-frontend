/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Avatar, Popover, List } from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPerson, MdLogout } from "react-icons/md";
import { IUser } from "@/types/auth";
import Link from "next/link";
import { paths } from "../paths";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/reducers/auth/authSlice";
import { useRouter } from "next/navigation";

const UserProfileButton = ({ user }: { user: IUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-profile-popover" : undefined;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push(paths.website.signin);
    handleClose();
  };

  return (
    <div>
      {/* Profile Section */}
      <div
        className="flex items-center space-x-3 px-3 cursor-pointer hover:bg-gray-200 py-2 rounded-full relative"
        onClick={handleProfileClick}
      >
        <Avatar
          src={user?.profilePicture ?? "https://via.placeholder.com/40"}
          alt="User Profile"
          sx={{ width: 40, height: 40 }}
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {user?.name ?? "Eyebook User"}
          </h3>
          <h3 className="text-gray-600 text-sm">
            @{user?.username ?? "username"}
          </h3>
        </div>
        <HiDotsHorizontal className="absolute right-3" />
      </div>

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            mt: 1, // Add margin to prevent overlap
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          },
        }}
      >
        {/* Popover Content */}
        <List sx={{ minWidth: 200, px: 1, py: 2 }}>
          <div>
            <Link href={paths.myAccount.root}>
              <div
                className="flex items-center gap-3 px-4 py-2 border rounded-full hover:bg-gray-100"
                onClick={handleClose}
              >
                <MdPerson />
                <h2>Visit Profile</h2>
              </div>
            </Link>
            <div
              className="flex items-center gap-3 px-4 py-2 border rounded-full hover:bg-gray-100 mt-2 cursor-pointer"
              onClick={handleLogout}
            >
              <MdLogout />
              <h2>Logout</h2>
            </div>
          </div>
        </List>
      </Popover>
    </div>
  );
};

export default UserProfileButton;
