import PropTypes from "prop-types";
import { forwardRef, Ref } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

interface SvgColorProps {
  src: string;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

const SvgColor = forwardRef(function SvgColor(
  { src, sx, ...other }: SvgColorProps,
  ref: Ref<HTMLSpanElement>
) {
  return (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  );
});

export default SvgColor;
