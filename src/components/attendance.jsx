
import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

const STORAGE_KEY = "hcm-lite-attendance-v1";
const EMPLOYEE_STORAGE_KEY = "hcm-lite-employees-v1";

const statuses = ["Present", "Absent", "Late", "On Leave"];

const statusColors = {
  Present: "success",
  Absent: "error",
  Late: "warning",
  "On Leave": "info",
};

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getEmployees() {
  const savedEmployees = readStorage(EMPLOYEE_STORAGE_KEY, []);
  return Array.isArray(savedEmployees) ? savedEmployees : [];
}

function getStatusColor(status) {
  return statusColors[status] || "default";
}

function SummaryCard({ title, value, icon, color, description }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        bgcolor: "#111827",
        color: "#f8fafc",
        border: "1px solid #273449",
        borderRadius: "16px",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, mt: 1, fontSize: "1.8rem" }}
            >
              {value}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#94a3b8", display: "block", mt: 1 }}
            >
              {description}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: `${color}20`,
              color,
              width: 48,
              height: 48,
              borderRadius: "14px",
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [employees, setEmployees] = useState(getEmployees);
  const [attendance, setAttendance] = useState(() =>
    readStorage(STORAGE_KEY, {})
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
    } catch {
      setMessage("Unable to save attendance in this browser.");
    }
  }, [attendance]);

  useEffect(() => {
    const refreshEmployees = () => {
      setEmployees(getEmployees());
    };

    window.addEventListener("storage", refreshEmployees);

    return () => {
      window.removeEventListener("storage", refreshEmployees);
    };
  }, []);

  const dayRecords = attendance[selectedDate] || {};

  const records = useMemo(() => {
    return employees.map((employee) => {
      const saved = dayRecords[employee.id] || {};

      return {
        ...employee,
        status: saved.status || "Not Marked",
        checkIn: saved.checkIn || "",
        checkOut: saved.checkOut || "",
      };
    });
  }, [employees, dayRecords]);

  const filteredRecords = records.filter((employee) => {
    const searchText =
      `${employee.name} ${employee.email} ${employee.department} ${employee.jobTitle}`
        .toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalEmployees = employees.length;
  const presentCount = records.filter(
    (employee) => employee.status === "Present"
  ).length;
  const absentCount = records.filter(
    (employee) => employee.status === "Absent"
  ).length;
  const lateCount = records.filter(
    (employee) => employee.status === "Late"
  ).length;

  const updateRecord = (employeeId, changes) => {
    setMessage("");

    setAttendance((previous) => {
      const previousDay = previous[selectedDate] || {};
      const previousRecord = previousDay[employeeId] || {};

      return {
        ...previous,
        [selectedDate]: {
          ...previousDay,
          [employeeId]: {
            ...previousRecord,
            ...changes,
          },
        },
      };
    });
  };

  const markAllPresent = () => {
    setMessage("");

    setAttendance((previous) => {
      const previousDay = previous[selectedDate] || {};
      const nextDay = { ...previousDay };

      employees.forEach((employee) => {
        const existing = nextDay[employee.id] || {};

        // Do not overwrite an attendance status already selected.
        if (!existing.status) {
          nextDay[employee.id] = {
            ...existing,
            status: "Present",
          };
        }
      });

      return {
        ...previous,
        [selectedDate]: nextDay,
      };
    });

    setMessage("Unmarked employees have been marked Present.");
  };

  const markedCount = records.filter(
    (employee) => employee.status !== "Not Marked"
  ).length;

  return (
    <Box className="space-y-6">
      {/* Heading */}
      <Box className="flex flex-wrap items-center justify-between gap-4">
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Attendance Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1 }}>
            Track daily attendance and employee check-in times.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<CheckCircleOutlineRounded />}
          onClick={markAllPresent}
          disabled={employees.length === 0}
          sx={{
            bgcolor: "#4f46e5",
            textTransform: "none",
            borderRadius: "10px",
            "&:hover": { bgcolor: "#4338ca" },
          }}
        >
          Mark Unmarked as Present
        </Button>
      </Box>

      {message && (
        <Alert
          severity={message.startsWith("Unable") ? "error" : "success"}
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}

      {/* Summary cards */}
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Employees"
          value={totalEmployees}
          icon={<GroupsRounded />}
          color="#818cf8"
          description="Employee records available"
        />

        <SummaryCard
          title="Present"
          value={presentCount}
          icon={<CheckCircleOutlineRounded />}
          color="#34d399"
          description="Marked present today"
        />

        <SummaryCard
          title="Absent"
          value={absentCount}
          icon={<CancelOutlined />}
          color="#f87171"
          description="Marked absent"
        />

        <SummaryCard
          title="Late"
          value={lateCount}
          icon={<AccessTimeRounded />}
          color="#fbbf24"
          description="Arrived late"
        />
      </Box>

      {/* Attendance table */}
      <Card
        elevation={0}
        sx={{
          bgcolor: "#111827",
          color: "#f8fafc",
          border: "1px solid #273449",
          borderRadius: "16px",
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Daily Attendance
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#94a3b8", mt: 0.5 }}
              >
                {markedCount} of {totalEmployees} employees marked
              </Typography>
            </Box>

            <Box className="flex items-center gap-2">
              <CalendarMonthRounded sx={{ color: "#a5b4fc" }} />
              <TextField
                type="date"
                size="small"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                sx={{
                  minWidth: 160,
                  "& .MuiInputBase-input": { color: "#f8fafc" },
                  "& .MuiSvgIcon-root": { color: "#cbd5e1" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#273449",
                  },
                }}
              />
            </Box>
          </Box>

          <Box className="mb-5 flex flex-wrap items-center gap-3">
            <TextField
              size="small"
              placeholder="Search employees..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchRounded
                    sx={{ color: "#94a3b8", mr: 1 }}
                  />
                ),
              }}
              sx={{
                flex: "1 1 240px",
                maxWidth: 380,
                "& .MuiInputBase-input": { color: "#f8fafc" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#0b1120",
                  borderRadius: "10px",
                  "& fieldset": { borderColor: "#273449" },
                },
              }}
            />

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel sx={{ color: "#94a3b8" }}>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(event) => setStatusFilter(event.target.value)}
                sx={{
                  color: "#f8fafc",
                  bgcolor: "#0b1120",
                  borderRadius: "10px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#273449",
                  },
                  ".MuiSvgIcon-root": { color: "#cbd5e1" },
                }}
              >
                {["All", ...statuses, "Not Marked"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box className="overflow-x-auto">
            <table className="w-full min-w-1000px border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  {[
                    "Employee",
                    "Department",
                    "Check In",
                    "Check Out",
                    "Status",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-3 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >
                    <td className="px-3 py-4">
                      <Typography sx={{ color: "#f8fafc", fontWeight: 600 }}>
                        {employee.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#94a3b8" }}
                      >
                        {employee.email || employee.jobTitle}
                      </Typography>
                    </td>

                    <td className="px-3 py-4 text-sm text-slate-300">
                      {employee.department || "—"}
                    </td>

                    <td className="px-3 py-4">
                      <TextField
                        type="time"
                        size="small"
                        value={employee.checkIn}
                        onChange={(event) =>
                          updateRecord(employee.id, {
                            checkIn: event.target.value,
                          })
                        }
                        disabled={
                          employee.status === "Absent" ||
                          employee.status === "On Leave"
                        }
                        slotProps={{
                          inputLabel: { shrink: true },
                        }}
                        sx={{
                          width: 125,
                          "& .MuiInputBase-input": {
                            color: "#f8fafc",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#273449",
                          },
                        }}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <TextField
                        type="time"
                        size="small"
                        value={employee.checkOut}
                        onChange={(event) =>
                          updateRecord(employee.id, {
                            checkOut: event.target.value,
                          })
                        }
                        disabled={
                          employee.status === "Absent" ||
                          employee.status === "On Leave"
                        }
                        slotProps={{
                          inputLabel: { shrink: true },
                        }}
                        sx={{
                          width: 125,
                          "& .MuiInputBase-input": {
                            color: "#f8fafc",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#273449",
                          },
                        }}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <Stack spacing={1} alignItems="flex-start">
                        <Chip
                          size="small"
                          label={employee.status}
                          color={getStatusColor(employee.status)}
                          variant={
                            employee.status === "Not Marked"
                              ? "outlined"
                              : "filled"
                          }
                        />

                        <FormControl size="small" sx={{ minWidth: 130 }}>
                          <Select
                            value={employee.status}
                            onChange={(event) => {
                              const status = event.target.value;
                              updateRecord(employee.id, {
                                status,
                                ...(status === "Absent" ||
                                status === "On Leave"
                                  ? { checkIn: "", checkOut: "" }
                                  : {}),
                              });
                            }}
                            sx={{
                              color: "#f8fafc",
                              fontSize: 13,
                              ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#273449",
                              },
                              ".MuiSvgIcon-root": { color: "#cbd5e1" },
                            }}
                          >
                            <MenuItem value="Not Marked">Not Marked</MenuItem>
                            {statuses.map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      {employees.length === 0
                        ? "No employees found. Add employees in the Employees page first."
                        : "No employees match your search or status filter."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export { Attendance };
