import Link from "next/link";
import React from "react";
import { paths } from "../paths";
interface Props {
  isMyProfile?: boolean;
}

const Header = ({ isMyProfile }: Props) => {
  return (
    <header className="fixed top-0 w-full bg-white py-3 shadow-md border-b z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center">
        {isMyProfile ? (
          <div className="flex items-center gap-2">
            <Link href={paths.root} className="text-2xl font-bold text-center">
              My Profile
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
