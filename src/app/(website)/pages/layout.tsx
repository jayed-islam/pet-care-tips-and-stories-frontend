import PageLayout from "@/layouts/page";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return <PageLayout isMyProfile>{children}</PageLayout>;
};

export default Layout;
