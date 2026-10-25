import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Create Account button clicked!");
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }

      console.log("Signup status:", response.status);
      console.log("Signup response:", data);

      if (!response.ok) {
        throw new Error(data.message || data.error || "Signup failed");
      }

      setMessage("Account created successfully! Redirecting to login...");

setTimeout(() => {
  window.location.href = "/login";
}, 1500);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Check that your backend is running."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#0b1120",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: "#111827",
            color: "#f1f5f9",
            border: "1px solid #263244",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} textAlign="center">
            HCM Lite
          </Typography>

          <Typography color="#94a3b8" textAlign="center" sx={{ mt: 1, mb: 3 }}>
            Create your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              autoComplete="name"
              inputProps={{ minLength: 2, maxLength: 50 }}
              sx={fieldStyle}
            />

            <TextField
              fullWidth
              required
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              autoComplete="email"
              sx={fieldStyle}
            />

            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              autoComplete="new-password"
              inputProps={{ minLength: 8 }}
              helperText="Use 8+ characters with uppercase, lowercase, a number, and a special character."
              sx={fieldStyle}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, py: 1.4, textTransform: "none", fontWeight: 700 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>
          </Box>

          <Typography textAlign="center" color="#94a3b8" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Link href="/login" underline="hover" color="#60a5fa">
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiInputLabel-root": { color: "#94a3b8" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
  "& .MuiOutlinedInput-root": {
    color: "#f1f5f9",
    "& fieldset": { borderColor: "#374151" },
    "&:hover fieldset": { borderColor: "#60a5fa" },
    "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
  },
};
