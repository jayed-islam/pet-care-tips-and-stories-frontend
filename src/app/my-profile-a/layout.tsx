import { AuthGuard } from "@/auth/guard/auth-guard";
import ProfileLayout from "@/layouts/profile";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <ProfileLayout isMyProfile>{children}</ProfileLayout>
    </AuthGuard>
  );
};

export default Layout;
