"use client";
import {
  ContactMailOutlined,
  Home,
  InfoOutlined,
  Search,
  NotificationsOutlined,
  Person,
  WorkspacePremium,
  Edit,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/image/eyebook-logo.png";
import { paths } from "../paths";
import { useAppSelector } from "@/redux/hooks";
import useBoolean from "@/hooks/use-boolean";
import { useRouter } from "next/navigation";
import { Button, IconButton, Tooltip } from "@mui/material";
import AuthDialog from "@/sections/auth/auth-dialog";

const navItems = [
  { href: "/", label: "Home", icon: <Home /> },
  { href: "/explore", label: "Explore", icon: <Search /> },
  {
    href: "/notification",
    label: "Notification",
    icon: <NotificationsOutlined />,
  },
  { href: paths.myAccount.root, label: "Profile", icon: <Person /> },
  { href: "/premium", label: "Premium", icon: <WorkspacePremium /> },
  { href: "/about-us", label: "About Us", icon: <InfoOutlined /> },
  { href: "/contact-us", label: "Contact Us", icon: <ContactMailOutlined /> },
];

const LeftSideSm = () => {
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
    <nav className="h-full w-full flex flex-col justify-between">
      <div className="p-5">
        <Link href={paths.root} className="">
          <Image src={logo} alt="eyebook" className="w-11 rounded-full" />
        </Link>
        <div className="flex-col mt-7">
          {navItems.map((item) => (
            <Tooltip title={item.label} arrow key={item.label}>
              <Link href={item.href} key={item.href} className="group">
                <div
                  className={`transition-all duration-500 rounded-full text-gray-800 h-12 w-12 flex items-start justify-center ${
                    pathname === item.href
                      ? "group-hover:bg-gray-200"
                      : "group-hover:bg-gray-200"
                  }`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                </div>
              </Link>
            </Tooltip>
          ))}
          {user && user?._id && (
            <IconButton
              sx={{
                height: "3rem",
                width: "3rem",
                bgcolor: "black",
                mt: 3,
                "&:hover": {
                  opacity: 0.7,
                  bgcolor: "black",
                },
              }}
            >
              <Edit className="text-white" />
            </IconButton>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="mt-5">
          {user ? (
            <div
              className="flex items-center cursor-pointer hover:bg-gray-200 rounded-full relative w-11 h-11"
              onClick={handleProfileClick}
            >
              <img
                src={user?.profilePicture ?? "https://via.placeholder.com/40"}
                alt="User Profile"
                className="w-11 h-11 rounded-full object-cover"
              />
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

export default LeftSideSm;
