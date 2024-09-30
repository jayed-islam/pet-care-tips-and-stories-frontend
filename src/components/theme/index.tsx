"use client";

import { useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";
import NextAppDirEmotionCacheProvider from "./next-emotion-cach-provider";
import { overrides } from "./overrides";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(),
      },
      customShadows: {
        ...customShadows(),
      },
      shadows: shadows(),
      shape: { borderRadius: 8 },
      typography,
    }),
    []
  );

  const theme = createTheme(memoizedValue as any);

  theme.components = overrides(theme) as any;

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
