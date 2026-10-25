import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";

import {
  DashboardRounded,
  PeopleAltRounded,
  AccessTimeRounded,
  EventAvailableRounded,
  PaymentsRounded,
  AnalyticsRounded,
  SmartToyRounded,
  CampaignRounded,
  SettingsRounded,
  LogoutRounded,
  BusinessRounded,
} from "@mui/icons-material";

const menuItems = [
  { label: "Dashboard", icon: <DashboardRounded /> },
  { label: "Employees", icon: <PeopleAltRounded /> },
  { label: "Attendance", icon: <AccessTimeRounded /> },
  { label: "Leave Management", icon: <EventAvailableRounded /> },
  { label: "Payroll", icon: <PaymentsRounded /> },
  { label: "Analytics", icon: <AnalyticsRounded /> },
  { label: "AI Assistant", icon: <SmartToyRounded /> },
];
function Sidebar({
  open = false,
  onClose= false,
  activePage = "Dashboard",
  onNavigate,
}) {
  const drawerWidth = 250;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827",
          color: "#e2e8f0",
          borderRight: "1px solid #273449",
        },
      }}
    >
      <Box className="flex h-full flex-col">
        {/* Company section */}
        <Box className="flex items-center gap-3 px-5 py-6">
          <Box
            className="flex items-center justify-center rounded-xl"
            sx={{
              width: 42,
              height: 42,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            <BusinessRounded sx={{ color: "#ffffff", fontSize: 25 }} />
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
              HCM Lite
            </Typography>
            <Typography sx={{ color: "#94a3b8", fontSize: 12 }}>
              Workforce Platform
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#273449" }} />

        {/* Main navigation */}
        <Box className="flex-1 px-3 py-5">
          <Typography
            sx={{
              color: "#64748b",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.2,
              px: 1.5,
              mb: 2,
            }}
          >
            WORKSPACE
          </Typography>

          <List disablePadding>
            {menuItems.map((item) => {
              const isActive = activePage === item.label;

              return (
                <ListItemButton
                  key={item.label}
                  onClick={() => onNavigate?.(item.label)}
                  selected={isActive}
                  sx={{
                    mb: 0.8,
                    minHeight: 44,
                    borderRadius: "10px",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    "& .MuiListItemIcon-root": {
                      minWidth: 38,
                      color: isActive ? "#a5b4fc" : "#94a3b8",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#312e81",
                      color: "#ffffff",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#3730a3",
                    },
                    "&:hover": {
                      backgroundColor: "#1f2937",
                      color: "#ffffff",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.2,
              px: 1.5,
              mt: 4,
              mb: 2,
            }}
          >
            SYSTEM
          </Typography>

          <List disablePadding>
            <ListItemButton
              onClick={() => onNavigate?.("Announcements")}
              sx={{
                minHeight: 44,
                borderRadius: "10px",
                color: "#94a3b8",
                "&:hover": { backgroundColor: "#1f2937", color: "#fff" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: "#94a3b8" }}>
                <CampaignRounded />
              </ListItemIcon>
              <ListItemText
                primary="Announcements"
                primaryTypographyProps={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => onNavigate?.("Settings")}
              sx={{
                minHeight: 44,
                borderRadius: "10px",
                color: "#94a3b8",
                "&:hover": { backgroundColor: "#1f2937", color: "#fff" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: "#94a3b8" }}>
                <SettingsRounded />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: 13 }}
              />
            </ListItemButton>
          </List>
        </Box>

        {/* User profile */}
        <Divider sx={{ borderColor: "#273449" }} />

        <Box className="flex items-center gap-3 p-4">
          <Avatar
            sx={{
              width: 38,
              height: 38,
              backgroundColor: "#4f46e5",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            SA
          </Avatar>

          <Box className="min-w-0 flex-1">
            <Typography noWrap sx={{ fontSize: 13, fontWeight: 700 }}>
              Admin User
            </Typography>
            <Typography noWrap sx={{ color: "#94a3b8", fontSize: 11 }}>
              Administrator
            </Typography>
          </Box>

          <Tooltip title="Logout (not connected yet)">
            <LogoutRounded sx={{ color: "#64748b", fontSize: 19 }} />
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
}
export { Sidebar };
