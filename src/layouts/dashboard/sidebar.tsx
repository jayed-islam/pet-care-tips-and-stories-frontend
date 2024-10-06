import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  ListItem,
} from "@mui/material";

import configNavs from "./config-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}

const NavItem = ({ icon, text, path }: NavItemProps) => {
  const pathname = usePathname();

  // Check if the current route is active
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
          backgroundColor: isActive ? "rgba(0, 0, 0, 0.15)" : "inherit",
          color: isActive ? "primary.main" : "text.primary",
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive ? "primary.main" : "text.secondary",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }: SidebarProps) => {
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {configNavs.map((item, index) => (
          <NavItem
            icon={item.icon}
            text={item.title}
            path={item.path}
            key={index}
          />
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Drawer for mobile devices */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent drawer for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
