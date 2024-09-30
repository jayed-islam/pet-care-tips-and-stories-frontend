// MenuDrawer.tsx
import React, { useState } from "react";
import { Drawer, Collapse, IconButton } from "@mui/material";
import {
  MdClose,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import Link from "next/link";
import { navConf } from "./config-navigation";
import { socialMedia } from "@/constants";

interface MenuDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, toggleDrawer }) => {
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  const handleCollapseToggle = (title: string) => {
    setOpenCollapse(openCollapse === title ? null : title);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
      <div className="w-72 sm:w-[23rem] p-5 bg-black relative h-full overflow-y-auto">
        {/* Close Icon */}
        <div className="absolute top-2 right-2">
          <IconButton className="text-white" onClick={toggleDrawer}>
            <MdClose size={24} className="text-white" />
          </IconButton>
        </div>

        {/* Drawer Header */}
        <div className="text-center">
          <h1 className="text-3xl lg:text-[2rem] font-bold text-white">
            FADAKO CO<span className="text-4xl text-blue-600">.</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="mt-11 pb-7">
          {navConf.map((item, index) => (
            <div key={index}>
              {/* For "Tips" or "Stories", add collapsible section */}
              {item.title === "Tips" || item.title === "Stories" ? (
                <div onClick={() => handleCollapseToggle(item.title)}>
                  <div className="flex items-center justify-between py-3 border-b border-gray-800">
                    <h2 className="text-md font-semibold text-white">
                      {item.title}
                    </h2>
                    <div className="text-gray-400 text-xl mr-5">
                      {openCollapse === item.title ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>

                  {/* Collapsible content */}
                  <Collapse in={openCollapse === item.title}>
                    <div className="mt-2 pl-4 space-y-3">
                      {[1, 2, 3].map((post, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <img
                            src="https://via.placeholder.com/50"
                            alt="post"
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-200">
                              Sample Post Title {post}
                            </h3>
                            <p className="text-xs text-gray-400">Date</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </div>
              ) : (
                // Regular navigation link
                <Link key={index} href="#" className="text-white">
                  <h2 className="text-md font-semibold text-white py-3 border-b border-gray-800">
                    {item.title}
                  </h2>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* What's Hot Section */}
        <div className="py-7">
          <h2 className="uppercase pb-5 text-md font-semibold text-white">
            What&apos;s Hot
          </h2>
          {[1, 2, 3].map((post, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 border-b border-gray-800 mb-5 pb-3"
            >
              <img
                src="https://via.placeholder.com/50"
                alt="post"
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-sm font-semibold text-white pb-2">
                  Sample Post Title {post}
                </h3>
                <p className="text-xs text-gray-400">JAN 22, 2024</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 items-center justify-center mt-5">
          {socialMedia.map((item, index) => (
            <a href="#" key={index}>
              <div className="bg-gray-600 h-10 w-10 rounded-full flex items-center justify-center text-xl hover:text-blue-600 transition-all duration-300">
                <span>{item.icon}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
