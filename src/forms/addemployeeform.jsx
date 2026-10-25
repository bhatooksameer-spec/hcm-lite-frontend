
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function AddEmployeeForm({
  open,
  onClose,
  onSubmit,
  form,
  onChange,
  error,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#111827",
          color: "#f8fafc",
          border: "1px solid #273449",
          borderRadius: "16px",
        },
      }}
    >
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Add New Employee
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8", mb: 3 }}
          >
            Enter the employee's details below.
          </Typography>

          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              fullWidth
            />

            <TextField
              required
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              fullWidth
            />

            <TextField
              select
              label="Department"
              name="department"
              value={form.department}
              onChange={onChange}
              required
              fullWidth
            >
              {[
                "HR",
                "Engineering",
                "Finance",
                "Marketing",
                "Operations",
                "Other",
              ].map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Job Title"
              name="jobTitle"
              value={form.jobTitle}
              onChange={onChange}
              required
              fullWidth
            />
          </Box>

          {error && (
            <Typography sx={{ color: "#f87171", mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={onClose}
            sx={{ color: "#cbd5e1", textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#4f46e5",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#4338ca",
              },
            }}
          >
            Save Employee
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
