/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { MenuItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { navLinks } from "./config-navs";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/reducers/auth/authSlice";

interface Props {
  toggleOpen?: any;
  isMobile: boolean;
}

const ProfileSidebar = ({ toggleOpen, isMobile }: Props) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };
  return (
    <aside className="bg-white h-min w-80 p-5">
      <nav>
        <ul className="space-y-4">
          {navLinks.map((navItem) => {
            console.log("path", navItem.path, pathname);
            const isActive = pathname === navItem.path;

            return (
              <div
                key={navItem.title}
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive ? "text-blue-600 bg-gray-200" : ""
                }`}
              >
                {isMobile ? (
                  <MenuItem
                    onClick={() => toggleOpen()}
                    component={Link}
                    href={navItem.path}
                  >
                    <ListItemIcon className="min-w-0 mr-2">
                      {navItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={navItem.title} />
                  </MenuItem>
                ) : (
                  <MenuItem component={Link} href={navItem.path}>
                    <ListItemIcon className="min-w-0 mr-2">
                      {navItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={navItem.title} />
                  </MenuItem>
                )}
              </div>
            );
          })}

          <Button
            variant="contained"
            onClick={handleLogout}
            fullWidth
            sx={{
              textTransform: "capitalize",
              mt: 3,
            }}
          >
            Logout
          </Button>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
