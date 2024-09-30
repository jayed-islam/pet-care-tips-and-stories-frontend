"use client";

import React from "react";
import SocialMediaIcon from "../common/social-media-icon";
import { socialMedia } from "@/constants";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import HeaderLayerTwo from "./header-second-layer";
import MenuDrawer from "./menu-drawer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMenu } from "@/redux/reducers/menu/menuSlice";
import { IconButton } from "@mui/material";

const Header = () => {
  const { isMenuOpen } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const toggleDrawer = () => {
    dispatch(toggleMenu());
  };

  return (
    <div>
      <div className="border-b border-gray-200 bg-black lg:bg-white">
        <header className="max-w-6xl mx-auto px-5 xl:px-0 py-2 lg:py-7">
          <div className="flex items-center justify-between">
            {/* Social Media Icons for large screens, Menu icon for small screens */}
            <div className="flex items-center">
              {/* Menu Icon (only visible on smaller screens) */}

              <div className="lg:hidden">
                <IconButton onClick={toggleDrawer}>
                  <HiOutlineMenuAlt2 className="text-3xl text-white" />
                </IconButton>
              </div>

              {/* Social Media Icons (only visible on large screens) */}
              <div className="hidden lg:flex space-x-4">
                {socialMedia.map((item, index) => (
                  <SocialMediaIcon
                    link={item.link}
                    icon={item.icon}
                    key={index}
                  />
                ))}
              </div>
            </div>

            {/* Website Title */}
            <div className="text-center">
              <h1 className="text-3xl lg:text-[2.5rem] font-bold lg:text-gray-800 text-white">
                FADAKO CO<span className="text-4xl text-blue-600">.</span>
              </h1>
            </div>

            {/* Subscribe Button for large screens, Search Icon for small screens */}
            <div className="flex items-center space-x-4">
              {/* Search Icon (only visible on smaller screens) */}
              <button className="lg:hidden">
                <LuSearch className="text-xl hover:text-blue-600 text-white lg:text-black transition-all duration-300" />
              </button>

              {/* Subscribe Button (only visible on large screens) */}
              <button className="hidden lg:inline-block bg-blue-600 text-white px-4 py-2 hover:bg-gray-900 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </header>
      </div>
      <HeaderLayerTwo />
      <MenuDrawer isOpen={isMenuOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Header;
