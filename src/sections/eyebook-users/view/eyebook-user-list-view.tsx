"use client";

import PageHeaderGlobal from "@/components/elements/page";
import { useGetUserListForUserQuery } from "@/redux/reducers/user/userApi";
import { CircularProgress, Pagination } from "@mui/material";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserCard from "../components/user-card";
import useDebounce from "@/hooks/use-debounce";

const EyebookUserListView = () => {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching } = useGetUserListForUserQuery({
    search: debouncedSearch,
    page,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div className="px-5 pb-44">
      <div className="min-h-screen w-full relative">
        <PageHeaderGlobal title="eyebook users" />
        <div className="px-3">
          <div className="relative hidden lg:flex w-full z-50 bg-white mt-2 border rounded-full border-gray-300">
            <FiSearch className="absolute left-5 top-3.5 text-xl" />
            <input
              type="text"
              placeholder="Search friends..."
              className="px-12 outline-none pt-2 pb-2.5 border-2 border-transparent rounded-full w-full focus:border-blue-500"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="mt-4 space-y-4">
            {isFetching ? (
              <div className="flex justify-center items-center">
                <CircularProgress />
              </div>
            ) : data?.data && data?.data?.users?.length > 0 ? (
              data.data?.users.map((user) => (
                <UserCard user={user} key={user._id} />
              ))
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}

            {!isFetching && data?.data && data.data?.users && (
              <div className="flex justify-center mt-4">
                <Pagination
                  count={data.data?.pagination?.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyebookUserListView;
