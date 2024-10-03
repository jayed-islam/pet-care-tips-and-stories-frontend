import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({
  toggleLeftDrawer,
  toggleRightDrawer,
}: {
  toggleLeftDrawer: (open: boolean) => void;
  toggleRightDrawer: (open: boolean) => void;
}) => {
  return (
    <header className="fixed top-0 w-full bg-white py-3 shadow-md border-b z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open left drawer"
          onClick={() => toggleLeftDrawer(true)}
          className="lg:hidden"
        >
          <MenuIcon />
        </IconButton>

        <div className="text-2xl font-bold">Facebook Clone</div>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="open right drawer"
          onClick={() => toggleRightDrawer(true)}
          className="lg:hidden"
        >
          <MenuIcon />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
