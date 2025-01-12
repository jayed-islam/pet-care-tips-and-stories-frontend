"use client";

import { FiSearch } from "react-icons/fi";
import { setSearchTerm } from "@/redux/reducers/post/postSlice";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserListForUserQuery } from "@/redux/reducers/user/userApi";
import RightSideUserItem from "../common/right-side-user-item";
import UserShimmerItem from "../common/right-side-user-item-shimmer-card";
import Link from "next/link";

const RightSide = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.post);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const { data, isFetching } = useGetUserListForUserQuery({});

  const users = data?.data?.users || [];
  const isEmpty = !isFetching && users.length === 0;

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
      {/* <div className="border rounded-3xl p-4 mt-5">
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
      </div> */}
      <div className="border rounded-3xl pt-4 mt-6">
        <h2 className="text-xl font-bold  pl-4">Who to follow</h2>
        <div className="mt-4">
          {/* {data?.data?.users?.map((user) => (
            <RightSideUserItem user={user} />
          ))} */}

          <div className="mt-4">
            {isFetching && (
              // Show shimmer when data is being fetched
              <div className="space-y-4 px-4">
                <UserShimmerItem />
                <UserShimmerItem />
                <UserShimmerItem />
              </div>
            )}

            {!isFetching && isEmpty && (
              // Show message if no items are fetched
              <div className="px-4 text-center text-gray-600">
                No users found to follow.
              </div>
            )}

            {!isFetching &&
              users
                .slice(0, 5)
                .map((user) => (
                  <RightSideUserItem key={user._id} user={user} />
                ))}

            {!isEmpty && (
              <Link href="/eyebook-users">
                <div className="rounded-b-3xl hover:bg-gray-100 transition-all duration-500 p-4">
                  <h2 className="text-md text-blue-500">Show more</h2>
                </div>
              </Link>
            )}
          </div>

          {/* <div className="rounded-b-3xl hover:bg-gray-100 transition-all duration-500 p-4">
            <h2 className="text-md text-blue-500">Show more</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
