
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Login failed"
        );
      }

      if (!data.token) {
        throw new Error("Login succeeded, but no token was returned.");
      }

      // Save the token returned by your backend.
      localStorage.setItem("hcm-token", data.token);

      // Open the dashboard.
      window.location.href = "/";
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Check that your backend is running."
          : err.message
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

          <Typography
            color="#94a3b8"
            textAlign="center"
            sx={{ mt: 1, mb: 3 }}
          >
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              sx={fieldStyle}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.4,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          <Typography
            textAlign="center"
            color="#94a3b8"
            sx={{ mt: 3 }}
          >
            Don't have an account?{" "}
            <Link href="/signup" underline="hover" color="#60a5fa">
              Sign up
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
