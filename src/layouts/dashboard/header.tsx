import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { paths } from "../paths";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header = ({ handleDrawerToggle }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Menu Icon (for mobile) */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link href={paths.root}>Eyebook | Dashboard</Link>
        </Typography>

        {/* Link to Home */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref legacyBehavior>
            <IconButton color="inherit" edge="end" component="a">
              <HomeIcon />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
