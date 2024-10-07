import React from "react";
import { TableCell, TableRow, Button, Chip } from "@mui/material";
import { IUser } from "@/types/auth";
import UpdateUserByAdminDialog from "./user-update-by-admin-dialog";
import useBoolean from "@/hooks/use-boolean";

// Define props type for the component
interface UserTableRowProps {
  user: IUser;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "suspended":
        return "warning";
      case "deactivated":
        return "error";
      default:
        return "default";
    }
  };

  const getRoleColor = (role: string) => {
    return role === "admin" ? "primary" : "default";
  };
  const dialog = useBoolean();
  return (
    <>
      <TableRow key={user._id}>
        <TableCell>{user.name || "N/A"}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone || "N/A"}</TableCell>
        <TableCell>{user.followers?.length || 0}</TableCell>
        <TableCell>{user.following?.length || 0}</TableCell>
        <TableCell>
          <Chip
            label={user.status ?? "N/A"}
            color={getStatusColor(user.status)}
          />
        </TableCell>
        <TableCell>
          <Chip label={user.role} color={getRoleColor(user.role)} />
        </TableCell>
        <TableCell>
          <Button variant="outlined" onClick={dialog.setTrue}>
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <UpdateUserByAdminDialog dialog={dialog} userData={user} />
    </>
  );
};

export default UserTableRow;
