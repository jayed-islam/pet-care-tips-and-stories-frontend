import React, { FC } from "react";
import { Container, Typography } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { UserRoles } from "@/types/user";

type PermissionGuardProp = {
  hasContent?: boolean;
  roles: UserRoles[];
  children: React.ReactNode;
};

export const PermissionGuard: FC<PermissionGuardProp> = ({
  hasContent,
  roles,
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const isPermitted =
    user?.role === "superAdmin" || roles.some((role) => user?.role === role);

  if (!isPermitted) {
    return hasContent ? (
      <Container
        sx={{
          textAlign: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Permission Denied
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          You do not have permission to access this page
        </Typography>
      </Container>
    ) : null;
  }

  return <>{children}</>;
};

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 12 }}
    >
      &copy; {currentYear}. All rights reserved.
    </Typography>
  );
};

export default Footer;
