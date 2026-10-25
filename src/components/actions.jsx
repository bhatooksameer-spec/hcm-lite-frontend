
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import HistoryRounded from "@mui/icons-material/HistoryRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";

function Actions() {
  const categories = [
    {
      title: "Employees",
      description: "Manage employee records",
      icon: <GroupsRounded />,
      color: "#818cf8",
    },
    {
      title: "Attendance",
      description: "Track daily attendance",
      icon: <AccessTimeRounded />,
      color: "#34d399",
    },
    {
      title: "Leave Management",
      description: "Review leave requests",
      icon: <EventAvailableRounded />,
      color: "#fbbf24",
    },
  ];

  return (
    <Box className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Recent Activity */}
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#111827",
          color: "#f8fafc",
          border: "1px solid #273449",
          borderRadius: "16px",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box className="mb-5 flex items-center gap-3">
            <HistoryRounded sx={{ color: "#818cf8" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Recent Activity
            </Typography>
          </Box>

          <Box className="flex min-h-32 flex-col items-center justify-center text-center">
            <HistoryRounded
              sx={{ fontSize: 42, color: "#475569", mb: 1 }}
            />

            <Typography sx={{ color: "#cbd5e1", fontWeight: 600 }}>
              No activity yet
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", mt: 0.5 }}
            >
              Activity will appear here as you use HCM Lite.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Activity Categories */}
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#111827",
          color: "#f8fafc",
          border: "1px solid #273449",
          borderRadius: "16px",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Quick Overview
          </Typography>

          <Box className="space-y-4">
            {categories.map((category) => (
              <Box
                key={category.title}
                className="flex items-center gap-3 rounded-xl border p-3"
                sx={{
                  borderColor: "#273449",
                  backgroundColor: "#0b1120",
                }}
              >
                <Box
                  className="flex items-center justify-center rounded-lg"
                  sx={{
                    width: 42,
                    height: 42,
                    color: category.color,
                    backgroundColor: `${category.color}20`,
                    flexShrink: 0,
                  }}
                >
                  {category.icon}
                </Box>

                <Box className="min-w-0 flex-1">
                  <Typography sx={{ fontWeight: 600 }}>
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#94a3b8", mt: 0.3 }}
                  >
                    {category.description}
                  </Typography>
                </Box>

                <Chip
                  label="Ready"
                  size="small"
                  sx={{
                    color: "#94a3b8",
                    backgroundColor: "#1e293b",
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export { Actions };
