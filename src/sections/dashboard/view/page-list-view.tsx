"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useGetPageListQuery } from "@/redux/reducers/page/pageApi";
import PageTableRow from "../page-row";
import useBoolean from "@/hooks/use-boolean";
import CreatePageDialog from "@/sections/pages/view/create-page-dialog";

const PageList: React.FC = () => {
  const { data, isFetching } = useGetPageListQuery();

  const createPage = useBoolean();

  // Render shimmer while fetching data
  if (isFetching) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width="100px" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="200px" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="150px" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="100px" />
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width="100px" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="200px" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="150px" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="100px" />
                </TableCell>
                <TableCell>
                  <Skeleton width={30} height={30} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // Render table with data once fetched
  return (
    <Box>
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h5">Pages list</Typography>
        <Button
          variant="contained"
          color="warning"
          sx={{
            textTransform: "capitalize",
          }}
          onClick={createPage.setTrue}
        >
          Create Page
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Followers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((page) => (
              <PageTableRow page={page} key={page._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreatePageDialog dialog={createPage} />
    </Box>
  );
};

export default PageList;
