import DashboardLayout from "@/layouts/dashboard";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Dashboard;
