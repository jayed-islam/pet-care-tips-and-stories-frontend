"use client";

import Link from "next/link";
import React from "react";
import { paths } from "../paths";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white py-3 shadow-md border-b z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center">
        <Link href={paths.root} className="text-2xl font-bold text-center">
          Eyebook
        </Link>
      </div>
    </header>
  );
};

export default Header;
