/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ReactNode, useState } from "react";
import Header from "./header";
import { Button, Drawer, IconButton } from "@mui/material";
import ProfileSidebar from "./sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileHeader from "./profile-header";

interface Props {
  children: ReactNode;
  isMyProfile?: boolean;
}

const ProfileLayout = ({ children, isMyProfile = false }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="bg-[#F0F2F5]">
      <Header />
      <ProfileHeader />

      <div className="flex items-start max-w-5xl mx-auto xl:px-0 py-5">
        <div className="hidden lg:block sticky top-20 shadow-lg border">
          <ProfileSidebar isMobile={false} />
        </div>
        <main className="flex-1 px-5">
          <div className="lg:hidden mb-5">
            <Button
              variant="contained"
              color="success"
              startIcon={<MenuIcon />}
              onClick={toggleDrawer(true)}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Open Profile Menu
            </Button>
          </div>
          {children}
        </main>
      </div>

      {/* Drawer for mobile */}
      <div className="lg:hidden">
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div>
            <ProfileSidebar isMobile toggleOpen={toggleDrawer} />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default ProfileLayout;
