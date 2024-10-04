"use client";

import useBoolean from "@/hooks/use-boolean";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm, toggleCategory } from "@/redux/reducers/post/postSlice";
import AuthDialog from "@/sections/auth/auth-dialog";
import { MoreHoriz } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

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

  const handleCategoryClick = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const categorites = [
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

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="w-full px-5 outline-none py-3  border border-gray-300 rounded-full"
        />
      </div>

      <div className="mb-6">
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
      </div>

      {/* Authentication Dialog */}
      <AuthDialog dialog={authDialog} />
    </div>
  );
};

export default RightSide;
