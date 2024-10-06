import { AuthGuard } from "@/auth/guard/auth-guard";
import { PermissionGuard } from "@/auth/guard/permission-guard";
import DashboardLayout from "@/layouts/dashboard";
import { UserRoles } from "@/types/user";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return (
    <AuthGuard>
      <PermissionGuard roles={[UserRoles.admin]} hasContent>
        <DashboardLayout>{children}</DashboardLayout>;
      </PermissionGuard>
    </AuthGuard>
  );
};

export default Dashboard;
