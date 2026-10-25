
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Navbar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { Cards } from "./components/cards";
import { Actions } from "./components/actions";
import { Employees } from "./components/employees";
import { Attendance } from "./components/attendance";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <>
            <Cards />
            <Actions />
          </>
        );

      case "Employees":
        return <Employees />;

      case "Attendance":
        return <Attendance />;

      default:
        return (
          <Box
            sx={{
              p: 4,
              backgroundColor: "#111827",
              border: "1px solid #273449",
              borderRadius: "16px",
              color: "#f8fafc",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {activePage}
            </Typography>

            <Typography sx={{ color: "#94a3b8", mt: 1 }}>
              This page is coming soon.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0b1120" }}>
      <Navbar
        onMenuClick={() =>
          setSidebarOpen((previous) => !previous)
        }
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <Box
        component="main"
        sx={{
          pt: "88px",
          px: { xs: 2, md: 3 },
          pb: 3,
          ml: { xs: 0, md: sidebarOpen ? "260px" : 0 },
          transition: "margin 0.3s ease",
          color: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <Box className="space-y-6">{renderPage()}</Box>
      </Box>
    </Box>
  );
}

function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          location.pathname === "/"
            ? <Dashboard />
            : <Typography sx={{ p: 4 }}>Page not found</Typography>
        }
      />
    </Routes>
  );
}

export default App;
