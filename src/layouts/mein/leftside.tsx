"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/image/eyebook-logo.png";
import { paths } from "../paths";
import { useAppSelector } from "@/redux/hooks";
import useBoolean from "@/hooks/use-boolean";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import AuthDialog from "@/sections/auth/auth-dialog";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPersonFillAdd } from "react-icons/bs";
import { mainNavItems } from "./conf-navigation";
import { LogoutOutlined } from "@mui/icons-material";
import { logout } from "@/redux/reducers/auth/authSlice";
import { useDispatch } from "react-redux";

const LeftSide = () => {
  const pathname = usePathname();

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
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push(paths.root);
  };
  return (
    <nav className="h-full w-full flex flex-col justify-between">
      <div className="p-5">
        <Link href={paths.root} className="">
          <Image src={logo} alt="eyebook" className="ml-3 w-11 rounded-full" />
        </Link>
        <div className="flex-col mt-7">
          {mainNavItems.map((item) => (
            <Link href={item.href} key={item.href} className="group">
              <div
                className={`w-min flex items-center transition-all duration-500 rounded-full text-gray-800 text-xl pl-3 pr-5 pt-2 pb-3 ${
                  pathname === item.href
                    ? "font-bold group-hover:bg-gray-200"
                    : "group-hover:bg-gray-200"
                }`}
              >
                <span className="mr-5">{item.icon}</span>
                <h2 className="hidden xl:block whitespace-nowrap ">
                  {item.label}
                </h2>
              </div>
            </Link>
          ))}

          <div
            onClick={handleLogout}
            className={`w-min flex items-center transition-all duration-500 rounded-full text-gray-800 text-xl pl-3 pr-5 pt-2 pb-3 hover:bg-gray-200 cursor-pointer`}
          >
            <span className="mr-5">
              <LogoutOutlined />
            </span>
            <h2 className="hidden xl:block whitespace-nowrap ">Logout</h2>
          </div>
          {user && user?._id && (
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                textTransform: "capitalize",
                borderRadius: "3rem",
                mt: 3,
                py: 1.5,
                bgcolor: "black",
              }}
              size="large"
            >
              Post
            </Button>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="mt-5">
          {user ? (
            <div
              className="flex items-center space-x-3 px-3 cursor-pointer hover:bg-gray-200 py-2 rounded-full relative"
              onClick={handleProfileClick}
            >
              <img
                src={user?.profilePicture ?? "https://via.placeholder.com/40"}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {user.name ?? "eyebook user"}
                </h3>
                <h3 className="text-gray-600 text-sm">
                  @{user.username ?? "username"}
                </h3>
              </div>

              <HiDotsHorizontal className="absolute right-3" />
            </div>
          ) : (
            <div onClick={authDialog.setTrue}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "3rem",
                  mb: 3,
                }}
                size="large"
              >
                Log in
              </Button>
            </div>
          )}
        </div>
      </div>
      <AuthDialog dialog={authDialog} />
    </nav>
  );
};

export default LeftSide;
