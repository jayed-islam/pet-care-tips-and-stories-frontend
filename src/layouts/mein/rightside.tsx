"use client";

import useBoolean from "@/hooks/use-boolean";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm, toggleCategory } from "@/redux/reducers/post/postSlice";
import AuthDialog from "@/sections/auth/auth-dialog";
import { MoreHoriz } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { paths } from "../paths";
import { logout } from "@/redux/reducers/auth/authSlice";

const RightSide = () => {
  const { user } = useAppSelector((state) => state.auth);
  const authDialog = useBoolean();
  const router = useRouter();

  const handleProfileClick = () => {
    if (user) {
      router.push("/my-profile");
    } else {
      authDialog.setTrue();
    }
  };

  const dispatch = useAppDispatch();
  const { selectedCategories, searchTerm } = useAppSelector(
    (state) => state.post
  );

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const categories = [
    {
      label: "Tips",
      value: "66fa38dfae27dd09c8f012bd",
    },
    {
      label: "Stories",
      value: "66fa3bd77dc9d17e683597c4",
    },
  ];

  return (
    <div className="">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Manage your Profile</h2>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>

        <Link href={paths.dashboard.root} className="lg:hidden mb-7 border-b">
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            variant="contained"
          >
            Admin Dashboard
          </Button>
        </Link>
        <div className="mt-5">
          {user ? (
            <div
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 py-1 px-1 rounded-sm"
              onClick={handleProfileClick}
            >
              <Image
                src={user.profilePicture || "https://via.placeholder.com/40"}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
                height={100}
                width={100}
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {user.name ?? "Unnamed user"}
                </h3>
              </div>
            </div>
          ) : (
            <div onClick={authDialog.setTrue}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Log in
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 lg:hidden">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="w-full px-5 outline-none py-3  border border-gray-300 rounded-full"
        />
      </div>

      {/* <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Filter by Category</h2>
        <div className="flex gap-2">
          {categorites.map((category, idx) => (
            <Button
              key={idx}
              fullWidth
              variant={
                selectedCategories.includes(category.value)
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              onClick={() => handleCategoryClick(category.value)}
              sx={{
                textTransform: "capitalize",
              }}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div> */}

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Filter by Category</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <FormControlLabel
              key={category.value}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                  color="primary"
                />
              }
              label={<span className="text-gray-800">{category.label}</span>}
            />
          ))}
        </div>
      </div>

      {user && user._id && (
        <div className="lg:hidden mt-5">
          <Button
            onClick={() => dispatch(logout())}
            variant="contained"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Logout
          </Button>
        </div>
      )}
      {/* Authentication Dialog */}
      <AuthDialog dialog={authDialog} />
    </div>
  );
};

export default RightSide;
