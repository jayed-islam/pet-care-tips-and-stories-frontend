import UserProfileLayout from "@/layouts/user-profile";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return <UserProfileLayout>{children}</UserProfileLayout>;
};

export default Layout;
