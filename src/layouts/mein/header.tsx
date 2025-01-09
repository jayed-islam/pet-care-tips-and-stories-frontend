/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/reducers/post/postSlice";
import { FiSearch } from "react-icons/fi";

const Header = ({
  toggleLeftDrawer,
}: {
  toggleLeftDrawer: (open: boolean) => void;
  toggleRightDrawer: (open: boolean) => void;
}) => {
  // const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.post);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="fixed top-0 w-full z-20">
      <div className="max-w-[78rem] mx-auto flex items-center justify-between">
        {/* <div>
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
              className="h-11 w-11 rounded-full"
            />

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
        <div className="flex-1 flex items-center justify-center">
          <Link
            href={paths.root}
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold"
          >
            Eyebook
          </Link>
        </div> */}
        <div></div>
        <div className="bg-white">
          <div className="relative hidden md:flex z-50 bg-white w-[23rem] mt-2 border rounded-full border-gray-300">
            <FiSearch className="absolute left-5 top-3.5 text-xl" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="px-12 outline-none pt-2 pb-2.5 border-2 border-transparent rounded-full w-full focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
