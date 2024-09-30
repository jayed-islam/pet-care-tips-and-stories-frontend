"use client";

import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { navConf } from "./config-navigation";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

const HeaderLayerTwo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  console.log("isH", isHovered);

  return (
    <div className="bg-white drop-shadow hidden lg:block">
      <header className="max-w-6xl mx-auto px-5 xl:px-0 relative">
        <div className="flex items-center justify-between">
          {/* Left Aligned Menu Icon */}
          <div>
            <div className="border border-transparent hover:border-gray-200 h-11 w-11  items-center justify-center text-xl hover:text-blue-600 transition-all duration-300 flex">
              <span>{<HiOutlineMenuAlt2 className="text-3xl" />}</span>
            </div>
          </div>

          {/* Center Aligned Nav Items with Dropdowns */}
          <nav className="hidden lg:flex space-x-8 group">
            {navConf.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() =>
                  item.title === "Tips" || item.title === "Stories"
                    ? handleMouseEnter()
                    : undefined
                }
                onMouseLeave={() =>
                  item.title === "Tips" || item.title === "Stories"
                    ? handleMouseLeave()
                    : undefined
                }
                className="py-4"
              >
                <Link href="#">
                  <div
                    className={`flex items-center gap-2 hover:text-blue-600 transition-all duration-300 ${
                      isHovered && "hover:text-blue-600"
                    }`}
                  >
                    <h2 className="uppercase text-xs font-semibold">
                      {item.title}
                    </h2>
                    {(item.title === "Tips" || item.title === "Stories") && (
                      <MdKeyboardArrowDown />
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Aligned Search Icon */}
          <div>
            <div>
              <div className="border border-transparent hover:border-gray-200 text-xl hover:text-blue-600 transition-all duration-300">
                <span>{<LuSearch className="text-2xl" />}</span>
              </div>
            </div>
          </div>
        </div>

        {/* absolute menu */}
        <div
          className={`absolute left-0 px-5 py-9 bg-white border shadow z-10 w-full ${
            isHovered ? "block" : "hidden"
          }`}
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        >
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Link key={index} className="" href="#">
                <div className="group">
                  <img
                    src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww"
                    className="w-full h-28 rounded-md object-cover"
                  />
                  <h2 className="text-sm font-semibold pt-5 pb-3 line-clamp-3 overflow-ellipsis group-hover:text-blue-600 transition-all duration-300">
                    Digging Up Old Graves to Make Room for Newly Fallen Soldiers
                  </h2>

                  <h2 className="text-xs text-gray-500">MAR 25, 2024</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderLayerTwo;
