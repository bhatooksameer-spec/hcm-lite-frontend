
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import EventBusyRounded from "@mui/icons-material/EventBusyRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";

const stats = [
  {
    title: "Total Employees",
    value: "0",
    subtitle: "Registered employees",
    icon: <GroupsRounded />,
    accent: "#818cf8",
  },
  {
    title: "Present Today",
    value: "0",
    subtitle: "Attendance recorded",
    icon: <PersonRounded />,
    accent: "#34d399",
  },
  {
    title: "Pending Leaves",
    value: "0",
    subtitle: "Awaiting approval",
    icon: <EventBusyRounded />,
    accent: "#fbbf24",
  },
  {
    title: "Payroll Status",
    value: "Not run",
    subtitle: "No payroll processed",
    icon: <PaymentsRounded />,
    accent: "#38bdf8",
  },
];

function StatCard({ title, value, subtitle, icon, accent }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: "#111827",
        color: "#f8fafc",
        border: "1px solid #273449",
        borderRadius: "16px",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: accent,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box className="flex items-start justify-between gap-3">
          <Box>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{ mt: 1.5, fontWeight: 800 }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            className="flex items-center justify-center rounded-xl"
            sx={{
              width: 46,
              height: 46,
              color: accent,
              backgroundColor: `${accent}20`,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{ display: "block", color: "#94a3b8", mt: 2 }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Cards() {
  return (
    <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </Box>
  );
}

export { Cards };
