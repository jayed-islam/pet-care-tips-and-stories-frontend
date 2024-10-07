/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TablePagination,
// } from "@mui/material";
// import Skeleton from "@mui/material/Skeleton";
// import {
//   useGetUserListQuery,
//   useUpdateUserByAdminMutation,
// } from "@/redux/reducers/user/userApi";

// const UserListView = () => {
//   const { data, isLoading } = useGetUserListQuery();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const [updateUserByAdmin, { isLoading: isUpdateAdminLoading }] =
//     useUpdateUserByAdminMutation();

//   return (
//     <div className="p-4">
//       <Typography variant="h4" gutterBottom>
//         User List
//       </Typography>

//       {isLoading ? (
//         <SkeletonLoader />
//       ) : data && data.data.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone</TableCell>
//                 <TableCell>Followers</TableCell>
//                 <TableCell>Following</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.data
//                 ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>{user.name || "N/A"}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.phone || "N/A"}</TableCell>
//                     <TableCell>{user.followers?.length || 0}</TableCell>
//                     <TableCell>{user.following?.length || 0}</TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             component="div"
//             count={data.data?.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       ) : (
//         <Typography variant="h6" align="center">
//           No Data
//         </Typography>
//       )}
//     </div>
//   );
// };

// // Skeleton loader for loading state
// const SkeletonLoader = () => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {[...Array(5)].map((_, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // export default UserListView;
// "use client";

// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TablePagination,
//   Button,
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import Skeleton from "@mui/material/Skeleton";
// import {
//   useGetUserListQuery,
//   useUpdateUserByAdminMutation,
// } from "@/redux/reducers/user/userApi";
// import { IUser } from "@/types/auth";

// const UserListView = () => {
//   const { data, isLoading } = useGetUserListQuery();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const [updateUserByAdmin, { isLoading: isUpdateAdminLoading }] =
//     useUpdateUserByAdminMutation();

//   const handleOpenDialog = (user: any) => {
//     setSelectedUser(user);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedUser(null);
//   };

//   const handleUpdateUser = async () => {
//     await updateUserByAdmin({
//       _id: selectedUser?._id as string,
//       role: selectedUser?.role as "admin" | "user",
//       status: selectedUser?.status as "active" | "diactive" | "blocked",
//     });
//     handleCloseDialog();
//   };

//   const handleRoleChange = (
//     event: React.ChangeEvent<{ value: "admin" | "user" }>
//   ) => {
//     setSelectedUser({
//       ...selectedUser,
//       role: event.target.value as "admin" | "user",
//     });
//   };

//   const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setSelectedUser({
//       ...selectedUser,
//       status: event.target.value as string,
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "success";
//       case "suspended":
//         return "warning";
//       case "deactivated":
//         return "error";
//       default:
//         return "default";
//     }
//   };

//   const getRoleColor = (role: string) => {
//     return role === "admin" ? "primary" : "default";
//   };

//   return (
//     <div className="p-4">
//       <Typography variant="h4" gutterBottom>
//         User List
//       </Typography>

//       {isLoading ? (
//         <SkeletonLoader />
//       ) : data && data.data.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone</TableCell>
//                 <TableCell>Followers</TableCell>
//                 <TableCell>Following</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.data
//                 ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>{user.name || "N/A"}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.phone || "N/A"}</TableCell>
//                     <TableCell>{user.followers?.length || 0}</TableCell>
//                     <TableCell>{user.following?.length || 0}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={user.status}
//                         color={getStatusColor(user.status)}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip label={user.role} color={getRoleColor(user.role)} />
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         onClick={() => handleOpenDialog(user)}
//                       >
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             component="div"
//             count={data.data?.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       ) : (
//         <Typography variant="h6" align="center">
//           No Data
//         </Typography>
//       )}

//       {/* Dialog for updating user status and role */}
//       <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Update User</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">Role</Typography>
//           <Select
//             fullWidth
//             value={selectedUser?.role || ""}
//             onChange={handleRoleChange}
//           >
//             <MenuItem value="admin">Admin</MenuItem>
//             <MenuItem value="user">User</MenuItem>
//           </Select>

//           <Typography variant="body1" className="mt-4">
//             Status
//           </Typography>
//           <Select
//             fullWidth
//             value={selectedUser?.status || ""}
//             onChange={handleStatusChange}
//           >
//             <MenuItem value="active">Active</MenuItem>
//             <MenuItem value="blocked">Suspended</MenuItem>
//             <MenuItem value="deactivated">Deactivated</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUpdateUser}
//             color="primary"
//             disabled={isUpdateAdminLoading}
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// // Skeleton loader for loading state
// const SkeletonLoader = () => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//             <TableCell>
//               <Skeleton width={100} />
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {[...Array(5)].map((_, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default UserListView;
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useGetUserListQuery } from "@/redux/reducers/user/userApi";
import { IUser } from "@/types/auth";
import UserTableRow from "../user-row";

const UserListView = () => {
  const { data, isLoading } = useGetUserListQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>

      {isLoading ? (
        <SkeletonLoader />
      ) : data && data.data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>Following</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: IUser) => (
                  <UserTableRow user={user} key={user._id} />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.data?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center">
          No Data
        </Typography>
      )}
    </div>
  );
};

// Skeleton loader for loading state
const SkeletonLoader = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListView;
