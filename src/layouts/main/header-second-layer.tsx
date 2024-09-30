import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";

const HeaderLayerTwo = () => {
  return (
    <div className="bg-white drop-shadow py-3">
      <header className=" max-w-6xl mx-auto px-5 xl:px-0">
        <div className="flex items-center justify-between">
          {/* Left Aligned Menu Icon */}
          <div>
            <div className="border border-transparent hover:border-gray-200 h-11 w-11  items-center justify-center text-xl hover:text-blue-600 transition-all duration-300 flex">
              <span>{<HiOutlineMenuAlt2 className="text-3xl" />}</span>
            </div>
          </div>

          {/* Center Aligned Nav Items with Dropdowns */}
          <nav className="hidden lg:flex space-x-8">
            {/* Navigation Item 1 with Submenu */}
            <div className="relative group">
              <button className="text-gray-700 font-medium">Home</button>
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-md mt-2 w-48 rounded-md z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sub Item 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sub Item 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sub Item 3
                </a>
              </div>
            </div>

            {/* Navigation Item 2 with Submenu */}
            <div className="relative group">
              <button className="text-gray-700 font-medium">About</button>
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-md mt-2 w-48 rounded-md z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sub Item 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sub Item 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sub Item 3
                </a>
              </div>
            </div>

            {/* Navigation Item 3 */}
            <a href="#" className="text-gray-700 font-medium">
              Contact
            </a>
          </nav>

          {/* Right Aligned Search Icon */}
          <div>
            <button>
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19a8 8 0 100-16 8 8 0 000 16zm7-7l-4-4"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderLayerTwo;
