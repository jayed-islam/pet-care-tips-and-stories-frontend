/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ReactNode, useState } from "react";
import Header from "./header";

interface Props {
  children: ReactNode;
}

const UserProfileLayout = ({ children }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="bg-[#F0F2F5]">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default UserProfileLayout;
