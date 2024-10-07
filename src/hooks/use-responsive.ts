/* eslint-disable react-hooks/rules-of-hooks */
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

// type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

// type MediaQueryOptions = {
//   breakpoint: Breakpoint;
//   direction: "up" | "down";
// };

// const useResponsive = ({
//   breakpoint,
//   direction,
// }: MediaQueryOptions): boolean => {
//   const theme = useTheme();
//   const matches = useMediaQuery(theme.breakpoints[direction](breakpoint));
//   return matches;
// };

// export default useResponsive;
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ----------------------------------------------------------------------

export function useResponsive(
  query: "up" | "down" | "between" | "only",
  start: "xs" | "sm" | "md" | "lg" | "xl",
  end?: "xs" | "sm" | "md" | "lg" | "xl"
): boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = useMediaQuery(
    theme.breakpoints.between(start, end || "xs")
  );
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth(): "xs" | "sm" | "md" | "lg" | "xl" {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce<"xs" | "sm" | "md" | "lg" | "xl" | null>((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || "xs"
  );
}
