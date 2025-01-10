/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ReactNode } from "react";
import PageHeader from "./page-header";

interface Props {
  children: ReactNode;
  isMyProfile?: boolean;
}

const PageLayout = ({ children, isMyProfile = false }: Props) => {
  return (
    <div className="">
      <PageHeader />
      <div className="flex items-start w-full py-5 border-r">
        <main className="flex-1 px-5">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
