/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";

import React from "react";
import { IUser } from "@/types/auth";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/reducers/auth/authSlice";

interface Props {
  user: IUser;
}

const ProfileDropDown = ({ user }: Props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  const navigation = [
    { title: "Dashboard", path: "javascript:void(0)" },
    { title: "Settings", path: "javascript:void(0)" },
    {
      title: "Log out",
      action: () => {
        dispatch(logout());
      },
    },
  ];

  useEffect(() => {
    const handleDropDown = (e: any) => {
      if (!profileRef?.current!.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative `}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img
            src={
              user?.profilePicture ??
              "https://randomuser.me/api/portraits/men/46.jpg"
            }
            className="w-full h-full rounded-full"
          />
        </button>
        <div className="lg:hidden">
          <span className="block">{user?.name ?? "N/A"}</span>
          <span className="block text-sm text-gray-500">
            {user?.email ?? "N/A"}
          </span>
        </div>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li
            key={idx}
            onClick={item.action ? item.action : undefined}
            className="cursor-pointer"
          >
            <a
              key={idx}
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              href={item.path}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileDropDown;
