"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";
import Header from "./header";
import LeftSide from "./leftside";
import RightSide from "./rightside";
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
    <div className="min-h-screen bg-[#F0F2F5]">
      <Header
        toggleLeftDrawer={toggleLeftDrawer}
        toggleRightDrawer={toggleRightDrawer}
      />

      <div className="max-w-screen-2xl mx-auto pt-16 ">
        {/* Left Sidebar for Large Screens */}
        <div className="hidden lg:block lg:w-72 xl:w-[23rem] fixed top-16 left-0 h-[calc(100vh-64px)] p-4">
          <LeftSide />
        </div>

        {/* Main Content */}
        <main className="flex-grow xl:ml-[23rem] xl:mr-[23rem] lg:ml-72 lg:mr-72 pt-5 md:mx-2 md:px-4">
          {children}
        </main>

        {/* Right Sidebar - Fixed for large screens */}
        <div className="hidden lg:block lg:w-72 xl:w-[23rem] fixed top-16 right-0 h-[calc(100vh-64px)] p-4">
          <RightSide />
        </div>
      </div>

      {/* Left Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={leftOpen}
        onClose={() => toggleLeftDrawer(false)}
      >
        <div className="w-64 p-4">
          <LeftSide />
        </div>
      </Drawer>

      {/* Right Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={rightOpen}
        onClose={() => toggleRightDrawer(false)}
      >
        <div className="w-64 p-4">
          <RightSide />
        </div>
      </Drawer>
    </div>
  );
};

export default MainLayout;
