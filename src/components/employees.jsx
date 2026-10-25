
import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import SearchRounded from "@mui/icons-material/SearchRounded";
import PersonAddAlt1Rounded from "@mui/icons-material/PersonAddAlt1Rounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";

import AddEmployeeForm from "../forms/addemployeeform";

function Employees() {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
 const [employees, setEmployees] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("hcm-lite-employees-v1") || "[]"
    );
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem(
    "hcm-lite-employees-v1",
    JSON.stringify(employees)
  );
}, [employees]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    jobTitle: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.department ||
      !form.jobTitle.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    const emailExists = employees.some(
      (employee) =>
        employee.email.toLowerCase() ===
        form.email.trim().toLowerCase()
    );

    if (emailExists) {
      setError("This email is already in the employee list.");
      return;
    }

    const newEmployee = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      jobTitle: form.jobTitle.trim(),
      status: "Active",
    };

    setEmployees((previousEmployees) => [
      ...previousEmployees,
      newEmployee,
    ]);

    setForm({
      name: "",
      email: "",
      department: "",
      jobTitle: "",
    });

    setFormOpen(false);
    setError("");
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.department} ${employee.jobTitle}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box className="space-y-6">
      <Box className="flex flex-wrap items-center justify-between gap-4">
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Employee Directory
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#94a3b8", mt: 0.5 }}
          >
            Manage your organization's employees.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAddAlt1Rounded />}
          onClick={() => {
            setError("");
            setFormOpen(true);
          }}
          sx={{
            backgroundColor: "#4f46e5",
            textTransform: "none",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#4338ca",
            },
          }}
        >
          Add Employee
        </Button>
      </Box>

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
          <Box className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              All Employees
            </Typography>

            <Chip
              label={`${employees.length} employees`}
              sx={{
                color: "#c7d2fe",
                backgroundColor: "#312e81",
              }}
            />
          </Box>

          <TextField
            fullWidth
            size="small"
            placeholder="Search employees..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                color: "#f8fafc",
                backgroundColor: "#0b1120",
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#273449",
                },
              },
            }}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Employee",
                    "Email",
                    "Department",
                    "Job Title",
                    "Status",
                  ].map((heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        color: "#94a3b8",
                        borderColor: "#273449",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        borderColor: "#273449",
                        py: 7,
                        textAlign: "center",
                      }}
                    >
                      <GroupsRounded
                        sx={{
                          fontSize: 44,
                          color: "#475569",
                          mb: 1,
                        }}
                      />

                      <Typography sx={{ color: "#cbd5e1" }}>
                        {search
                          ? "No matching employees found."
                          : "No employees added yet."}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#94a3b8", mt: 1 }}
                      >
                        Click Add Employee to create your first record.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell sx={{ color: "#f8fafc", borderColor: "#273449" }}>
                        {employee.name}
                      </TableCell>

                      <TableCell sx={{ color: "#cbd5e1", borderColor: "#273449" }}>
                        {employee.email}
                      </TableCell>

                      <TableCell sx={{ color: "#cbd5e1", borderColor: "#273449" }}>
                        {employee.department}
                      </TableCell>

                      <TableCell sx={{ color: "#cbd5e1", borderColor: "#273449" }}>
                        {employee.jobTitle}
                      </TableCell>

                      <TableCell sx={{ borderColor: "#273449" }}>
                        <Chip
                          label={employee.status}
                          size="small"
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <AddEmployeeForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setError("");
        }}
        onSubmit={handleSubmit}
        form={form}
        onChange={handleChange}
        error={error}
      />
    </Box>
  );
}

export { Employees };
