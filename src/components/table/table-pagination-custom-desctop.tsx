import React, { FC, ChangeEvent } from "react";
import { Stack, Select, MenuItem, Pagination, Typography } from "@mui/material";

interface ITablePaginationDesktopProps {
  total: number;
  rowsPerPage: number;
  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

export const TablePaginationDesktop: FC<ITablePaginationDesktopProps> = ({
  total,
  rowsPerPage,
  onChangeRowsPerPage,
  currentPage,
  onChangePage,
}) => {
  const rowsPerPageOptions = [10, 25, 50];
  return (
    <Stack
      flexDirection="row"
      spacing={1}
      alignItems="center"
      justifyContent="end"
      p={1}
    >
      <Stack flexDirection="row" spacing={1} alignItems="center">
        <Typography variant="subtitle2" fontWeight={400}>
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={(event) =>
            onChangeRowsPerPage(event as ChangeEvent<HTMLInputElement>)
          }
          variant="outlined"
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Pagination
        count={Math.ceil((total || 0) / rowsPerPage)}
        page={currentPage + 1}
        onChange={(event, page) =>
          onChangePage(event as React.MouseEvent<HTMLButtonElement>, page - 1)
        }
      />
    </Stack>
  );
};
