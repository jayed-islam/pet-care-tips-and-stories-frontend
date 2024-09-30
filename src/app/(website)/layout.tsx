import MainLayout from "@/layouts/main";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WebsiteLayout = ({ children }: Props) => {
  return <MainLayout>{children}</MainLayout>;
};

export default WebsiteLayout;
