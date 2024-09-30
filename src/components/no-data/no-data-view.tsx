import { paths } from "@/layouts/paths";
import Link from "next/link";
import React from "react";

interface Props {
  category?: string;
}

const NoDataFoundView = ({ category }: Props) => {
  return (
    <div className="w-full px-3 sm:px-0 py-11">
      <div className="border border-green-500 px-5 py-2 mb-7">
        <h1>
          No product found in the{" "}
          <span className="font-semibold text-green-500">{category}</span>{" "}
          category.
        </h1>
      </div>

      <Link
        href={paths.root}
        className=" bg-green-500 px-5 text-sm font-semibold py-2 rounded-full text-white"
      >
        RETURN TO SHOP
      </Link>
    </div>
  );
};

export default NoDataFoundView;
