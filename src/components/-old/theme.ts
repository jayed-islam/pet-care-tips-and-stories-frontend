"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {},
        indicator: {
          height: 3,
          color: "green",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "13px 5px",
          minHeight: 48,
          marginRight: 21,
          fontWeight: 500,
          "&.Mui-selected": {
            color: "#000",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
  },
});

export default theme;
