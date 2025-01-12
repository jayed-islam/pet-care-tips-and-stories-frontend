import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import useBoolean from "@/hooks/use-boolean";
import { IPage } from "@/types/page";
import { Edit } from "@mui/icons-material";
import UpdatePageDialog from "../pages/view/update-page-dialog";

interface PageTableRowProps {
  page: IPage;
}

const PageTableRow: React.FC<PageTableRowProps> = ({ page }) => {
  const dialog = useBoolean();

  return (
    <>
      <TableRow key={page._id}>
        <TableCell>
          <img
            src={page.logo}
            alt={`${page.name} logo`}
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        </TableCell>
        <TableCell>{page.name}</TableCell>
        <TableCell>{page.description ?? "N/A"}</TableCell>
        <TableCell>{page.followers.length}</TableCell>
        <TableCell>
          <IconButton onClick={dialog.setTrue}>
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>
      <UpdatePageDialog dialog={dialog} page={page} />
    </>
  );
};

export default PageTableRow;
