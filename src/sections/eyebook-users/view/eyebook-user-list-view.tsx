"use client";

import PageHeader from "@/components/elements/page";
import { useGetUserListForUserQuery } from "@/redux/reducers/user/userApi";
import { Box, CircularProgress, Pagination, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserCard from "../components/user-card";
import useDebounce from "@/hooks/use-debounce";

const EyebookUserListView = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  const [page, setPage] = useState(1);
  const limit = 15;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching } = useGetUserListForUserQuery({
    search: debouncedSearch,
  });

  const handleAddFriend = (userId: string) => {
    console.log("Add friend for user ID:", userId);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div className="pr-3">
      <div className="h-full w-full relative border-r">
        <PageHeader
          title="eyebook users"
          //   children={
          //     <div className="flex items-center h-full w-full">
          //       {tabs.map((tab) => (
          //         <div
          //           key={tab.value}
          //           className="w-full h-full relative flex items-center justify-center cursor-pointer hover:bg-gray-100"
          //           onClick={() => setActiveTab(tab.value)}
          //         >
          //           <h2
          //             className={`text-md text-center ${
          //               activeTab === tab.value
          //                 ? "font-bold text-black"
          //                 : "text-gray-700 font-semibold"
          //             }`}
          //           >
          //             {tab.title}
          //           </h2>
          //           {activeTab === tab.value && (
          //             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[4rem] h-1 bg-blue-500 rounded-sm "></div>
          //           )}
          //         </div>
          //       ))}
          //     </div>
          //   }
          //   children={
          //     <div className="flex items-center gap-3">
          //       <div className="relative hidden lg:flex flex-1 z-50 bg-white mt-2 border rounded-full border-gray-300">
          //         <FiSearch className="absolute left-5 top-3.5 text-xl" />
          //         <input
          //           type="text"
          //           placeholder="Search friends..."
          //           className="px-12 outline-none pt-2 pb-2.5 border-2 border-transparent rounded-full w-full focus:border-green-500"
          //         />
          //       </div>
          //       <div className="w-44">
          //         <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
          //           <Tabs value={activeTab} onChange={handleTabChange} centered>
          //             {tabs.map((tab) => (
          //               <Tab label={tab.title} value={tab.value} />
          //             ))}
          //           </Tabs>
          //         </Box>
          //       </div>
          //     </div>
          //   }
        />
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

          <div className="px-3 mt-4 space-y-4">
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

            {data?.data && data.data?.users && (
              <div className="flex justify-center mt-4">
                <Pagination
                  count={data.data.pagination?.totalPages}
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
