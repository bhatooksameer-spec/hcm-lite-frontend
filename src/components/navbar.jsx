import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Badge,
  Tooltip,
} from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon,
} from "@mui/icons-material";
function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#111827",
        borderBottom: "1px solid #273449",
        color: "#f8fafc",
        zIndex: 1201,
      }}
    >
      <Toolbar className="flex justify-between gap-3 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <IconButton
            onClick={onMenuClick}
            aria-label="Open sidebar"
            sx={{ color: "#cbd5e1" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
          >
            HCM<span style={{ color: "#818cf8" }}>.</span>
          </Typography>

          <Typography
            variant="body2"
            className="hidden sm:block"
            sx={{
              color: "#94a3b8",
              borderLeft: "1px solid #334155",
              paddingLeft: 2,
            }}
          >
            Human Capital Management
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2">
            <SearchIcon sx={{ color: "#94a3b8", fontSize: 20 }} />

            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "Search" }}
              sx={{
                color: "#f8fafc",
                fontSize: 13,
                "& input::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
                },
              }}
            />
          </div>
          <Button variant="contained" onClick={() => navigate("/signup")}>
            Create Account
          </Button>

          <Tooltip title="Notifications">
            <IconButton aria-label="Notifications" sx={{ color: "#cbd5e1" }}>
              <Badge
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#818cf8",
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#4f46e5",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            SA
          </Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
