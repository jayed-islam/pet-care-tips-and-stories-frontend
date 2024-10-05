import React from "react";
import Link from "next/link";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { navLinks } from "./config-navs";
import { usePathname } from "next/navigation";

const ProfileSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-white shadow-lg border h-min w-80 p-5">
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
                <MenuItem component={Link} href={navItem.path}>
                  <ListItemIcon className="min-w-0 mr-2">
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={navItem.title} />
                </MenuItem>
              </div>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
