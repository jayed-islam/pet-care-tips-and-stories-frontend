"use client";

import React from "react";
import { IPage } from "@/types/page";

interface Props {
  page: IPage;
}

const PageInfoViewTab = ({ page }: Props) => {
  return (
    <div className="w-full">
      {/* Page Information Section */}
      <div className="bg-white p-5 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">{page?.name}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Followers:</strong> {page?.followers.length || 0}
        </p>
        <p className="text-gray-600">
          <strong>Posts:</strong> {page?.posts.length || 0}
        </p>
      </div>
    </div>
  );
};

export default PageInfoViewTab;
