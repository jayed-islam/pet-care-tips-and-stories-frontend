import MainLayout from "@/layouts/mein";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WebsiteLayout = ({ children }: Props) => {
  return <MainLayout>{children}</MainLayout>;
};
// const WebsiteLayout = ({ children }: Props) => {
//   return <MainLayout>{children}</MainLayout>;
// };

export default WebsiteLayout;
