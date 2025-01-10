import { AuthGuard } from "@/auth/guard/auth-guard";
import MainLayout from "@/layouts/mein";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WebsiteLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
};

export default WebsiteLayout;
