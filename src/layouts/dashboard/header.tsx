import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { paths } from "../paths";
import AdminProfileDropdown from "./profile-popover";
import { useAppSelector } from "@/redux/hooks";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header = ({ handleDrawerToggle }: HeaderProps) => {
  const { user } = useAppSelector((state) => state.auth);
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <h2 className="text-lg font-semibold hidden md:block">
            {user?.name ?? "eyebook admin"}
          </h2>
          <AdminProfileDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
