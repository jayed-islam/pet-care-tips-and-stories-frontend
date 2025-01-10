"use client";

import { HiBadgeCheck } from "react-icons/hi";
import { Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { setSearchTerm } from "@/redux/reducers/post/postSlice";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const RightSide = () => {
  // const { user } = useAppSelector((state) => state.auth);
  // const authDialog = useBoolean();
  // const router = useRouter();

  // const handleProfileClick = () => {
  //   if (user) {
  //     router.push("/my-profile");
  //   } else {
  //     authDialog.setTrue();
  //   }
  // };

  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.post);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // const handleCategoryChange = (category: string) => {
  //   dispatch(toggleCategory(category));
  // };

  // const categories = [
  //   {
  //     label: "Tips",
  //     value: "66fa38dfae27dd09c8f012bd",
  //   },
  //   {
  //     label: "Stories",
  //     value: "66fa3bd77dc9d17e683597c4",
  //   },
  // ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      title: "Web Developer",
      isVerified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "UI/UX Designer",
      isVerified: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      title: "Full Stack Engineer",
      isVerified: true,
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="relative hidden lg:flex z-50 bg-white mt-2 border rounded-full border-gray-300">
        <FiSearch className="absolute left-5 top-3.5 text-xl" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="px-12 outline-none pt-2 pb-2.5 border-2 border-transparent rounded-full w-full focus:border-green-500"
        />
      </div>
      <div className="border rounded-3xl p-4 mt-5">
        <h2 className="text-xl font-bold">Subscribe to Premium</h2>
        <p className="text-base text-gray-600 mt-3">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <Button
          sx={{
            mt: 2,
            borderRadius: "3rem",
            textTransform: "capitalize",
            bgcolor: "#3b82f6",
            px: 3,
          }}
          disableElevation
          variant="contained"
        >
          Subscribe
        </Button>
      </div>
      <div className="border rounded-3xl pt-4 mt-6">
        <h2 className="text-xl font-bold  pl-4">Who to follow</h2>
        <div className="mt-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between py-2 last:border-none px-4 hover:bg-gray-100 transition-all duration-500 cursor-pointer"
            >
              {/* User Info */}
              <div className="flex items-center">
                {/* Placeholder Logo */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                {/* User Details */}
                <div className="ml-4">
                  <div className="flex items-center">
                    <h3 className="text-sm font-semibold hover:underline">
                      {user.title}
                    </h3>
                    {user.isVerified && (
                      <HiBadgeCheck className="mt-1 ml-1 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{user.name}</p>
                </div>
              </div>
              {/* Follow Button */}
              <Button
                sx={{
                  borderRadius: "3rem",
                  textTransform: "capitalize",
                  bgcolor: "black",
                }}
                disableElevation
                variant="contained"
                size="small"
              >
                Follow
              </Button>
            </div>
          ))}

          <div className="rounded-b-3xl hover:bg-gray-100 transition-all duration-500 p-4">
            <h2 className="text-md text-blue-500">Show more</h2>
          </div>
        </div>
      </div>

      {/* <div className="absolute top-0 z-50 bg-white right-0 left-0 w-full">
        <div className="relative hidden md:flex mt-2 w-full">
          <FiSearch className="absolute left-3 top-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className=" pl-8 outline-none py-2 border border-gray-300 rounded-full bg-gray-100 w-full"
          />
        </div>
      </div> */}
      {/* <div className="">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Manage your Profile</h2>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>

        {user && user.role === "admin" && (
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
        )}
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
      </div> */}

      {/* <div className="mb-6 lg:hidden">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="w-full px-5 outline-none py-3  border border-gray-300 rounded-full"
        />
      </div> */}
      {/* <div className="mb-6">
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
      </div> */}

      {/* {user && user._id && (
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
      )} */}
      {/* Authentication Dialog */}
      {/* <AuthDialog dialog={authDialog} /> */}
    </div>
  );
};

export default RightSide;
