"use client";

import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import LeftSide from "./leftside";
import RightSide from "./rightside";
import { Close } from "@mui/icons-material";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const toggleLeftDrawer = (open: boolean) => {
    setLeftOpen(open);
  };

  const toggleRightDrawer = (open: boolean) => {
    setRightOpen(open);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5 bg-white">
      {/* <Header
        toggleLeftDrawer={toggleLeftDrawer}
        toggleRightDrawer={toggleRightDrawer}
      /> */}

      <div className="max-w-[78rem] mx-auto flex items-start">
        {/* Left Sidebar for Large Screens */}
        <div
          className="hidden lg:block lg:w-72 xl:w-[17rem] h-screen border-r fixed z-50 top-0"
          style={{ marginLeft: "0" }}
        >
          <LeftSide />
        </div>

        {/* Main Content */}
        <main
          className="flex-1 pr-5"
          style={{
            maxWidth: "calc(78rem - 40rem)",
            marginLeft: "17rem",
            marginRight: "23rem",
          }}
        >
          {children}
        </main>

        <div
          className="hidden xl:block xl:w-[23rem] h-screen fixed top-0 right-auto bg-white"
          style={{ marginLeft: "calc(78rem - 23rem)" }}
        >
          <RightSide />
        </div>
      </div>

      {/* Left Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={leftOpen}
        onClose={() => toggleLeftDrawer(false)}
      >
        <div className="w-80 p-5">
          <LeftSide />
        </div>
      </Drawer>

      {/* Right Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={rightOpen}
        onClose={() => toggleRightDrawer(false)}
      >
        <div className="w-80 p-4">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open right drawer"
            onClick={() => toggleRightDrawer(false)}
            className="lg:hidden"
          >
            <Close />
          </IconButton>
          <RightSide />
        </div>
      </Drawer>
    </div>
  );
};

export default MainLayout;
