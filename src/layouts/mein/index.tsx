/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Drawer, Fab, IconButton } from "@mui/material";
import LeftSide from "./leftside";
import RightSide from "./rightside";
import { Close, KeyboardArrowUp } from "@mui/icons-material";
import LeftSideSm from "./left-sde-sm";
import Header from "./header";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleLeftDrawer = (open: boolean) => {
    setLeftOpen(open);
  };

  const toggleRightDrawer = (open: boolean) => {
    setRightOpen(open);
  };

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
    setShowScrollButton(currentPosition > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen ">
      <Header
        toggleLeftDrawer={toggleLeftDrawer}
        toggleRightDrawer={toggleRightDrawer}
      />

      <div className="max-w-[78rem] mx-auto flex items-start">
        <div className="hidden xl:block md:w-64 lg:w-72 xl:w-[17rem] h-screen border-r fixed z-50 top-0">
          <LeftSide />
        </div>

        <div className="hidden sm:block xl:hidden sm:w-[5.5rem]  h-screen border-r fixed z-50 top-0">
          <LeftSideSm />
        </div>

        <main
          className="
    w-full
    lg:max-w-[calc(78rem-40rem)] 
    mx-auto
    sm:ml-[5.5rem]
    xl:ml-[17rem]
    relative
    bg-[#F0F2F5]
  "
          // lg:ml-[17rem]
          // lg:mr-[23rem]
        >
          {children}

          {showScrollButton && (
            <Fab
              color="primary"
              size="small"
              onClick={scrollToTop}
              style={{
                position: "fixed",
                left: "50%",
                bottom: "50px",
                transform: "translateX(-50%)",
                zIndex: 1000,
              }}
            >
              <KeyboardArrowUp />
            </Fab>
          )}
        </main>

        <div
          className="
    hidden 
    lg:flex
    lg:w-[19rem] 
    xl:w-[23rem]
    h-screen 
    fixed 
    top-0  
    xl:ml-[calc(78rem-23rem)]
    lg:ml-[calc(78rem-19rem)]
    right-0
    xl:right-auto
    mr-5
    xl:mr-0
    pl-5
  "
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
        <div className="w-72">
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
