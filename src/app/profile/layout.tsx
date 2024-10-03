import ProfileLayout from "@/layouts/profile";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return <ProfileLayout>{children}</ProfileLayout>;
};

export default Layout;
