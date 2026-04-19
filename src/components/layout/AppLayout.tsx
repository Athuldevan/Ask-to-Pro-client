import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

const drawerWidth = 240; // expanded width
const collapsedWidth = 72; // collapsed width

export default function AppLayout() {
  const [sidebarCollapsed] = useState(false);

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <CssBaseline />

      {/* Sidebar Drawer */}
      {/* <SideBar open={sidebarCollapsed} setOpen={setSidebarCollapsed} /> */}

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          width: `calc(100% - ${
            sidebarCollapsed ? collapsedWidth : drawerWidth
          }px)`,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {/* Top Navbar */}
        {/* <TopNavbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        /> */}

        {/* Routed Content */}
        <Box
          minHeight="calc(100vh - 64px)"
          bgcolor={"background.default"}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
