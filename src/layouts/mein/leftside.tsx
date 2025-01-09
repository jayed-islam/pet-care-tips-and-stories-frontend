"use client";
import {
  ContactMailOutlined,
  Home,
  InfoOutlined,
  Search,
  NotificationsOutlined,
  Person,
  WorkspacePremium,
} from "@mui/icons-material";
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

const navItems = [
  { href: "/", label: "Home", icon: <Home /> },
  { href: "/explore", label: "Explore", icon: <Search /> },
  {
    href: "/notification",
    label: "Notification",
    icon: <NotificationsOutlined />,
  },
  { href: "/profile", label: "Profile", icon: <Person /> },
  { href: "/premium", label: "Premium", icon: <WorkspacePremium /> },
  { href: "/about-us", label: "About Us", icon: <InfoOutlined /> },
  { href: "/contact-us", label: "Contact Us", icon: <ContactMailOutlined /> },
];

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

  return (
    <nav className="bg-white h-full w-full flex flex-col justify-between">
      <div className="p-5">
        <Link href={paths.root} className="">
          <Image src={logo} alt="fadako" className="ml-3 w-11 rounded-full" />
        </Link>
        <div className="flex flex-col mt-7">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} className="group">
              <div
                className={`w-min flex items-center transition-all duration-500 rounded-full text-gray-800 text-xl pl-3 pr-5 pt-2 pb-3 ${
                  pathname === item.href
                    ? "font-bold group-hover:bg-gray-200"
                    : "group-hover:bg-gray-200"
                }`}
              >
                <span className="mr-5">{item.icon}</span>
                <h2 className="whitespace-nowrap">{item.label}</h2>
              </div>
            </Link>
          ))}
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
