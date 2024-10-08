"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BooleanState } from "@/types/utils";
import { useRouter } from "next/navigation";
import { paths } from "@/layouts/paths";

interface Props {
  snackbar: BooleanState;
}

export default function PostSnackbar({ snackbar }: Props) {
  const router = useRouter();

  const handleSeePost = () => {
    router.push(paths.myAccount.root);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSeePost}>
        SEE NOW
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={snackbar.setFalse}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={snackbar.value}
      autoHideDuration={6000}
      onClose={snackbar.setFalse}
      message="Post created!!!"
      action={action}
    />
  );
}
