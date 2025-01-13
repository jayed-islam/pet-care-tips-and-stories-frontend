import { paths } from "@/layouts/paths";
import Link from "next/link";
import React from "react";

interface PageHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

const PageHeaderGlobal: React.FC<PageHeaderProps> = ({
  title = "eyebook",
  children,
}) => {
  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-lg h-[4rem] w-full sticky top-0 border-b border-l border-r border-gray-300 rounded-b-3xl flex items-center justify-center z-50">
      {children ? (
        <div className="h-full w-full">{children}</div>
      ) : (
        <Link href={paths.root}>
          <h1 className="text-xl font-bold text-gray-700 text-center">
            {title}
          </h1>
        </Link>
      )}
    </div>
  );
};

export default PageHeaderGlobal;
