"use client";

import Link from "next/link";
import React from "react";
import { paths } from "../paths";
import { usePathname } from "next/navigation";
interface Props {
  isMyProfile?: boolean;
}

const Header = ({ isMyProfile }: Props) => {
  const pathname = usePathname();
  const isPurchasedPage = pathname.includes("purchased-post");
  return (
    <header className="fixed top-0 w-full bg-white py-3 shadow-md border-b z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center">
        {isMyProfile ? (
          <div className="flex items-center gap-2">
            <Link href={paths.root} className="text-2xl font-bold text-center">
              {isPurchasedPage ? "Purchased Posts" : "My Profile"}
            </Link>
          </div>
        ) : (
          <Link href={paths.root} className="text-2xl font-bold text-center">
            Fadako
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
