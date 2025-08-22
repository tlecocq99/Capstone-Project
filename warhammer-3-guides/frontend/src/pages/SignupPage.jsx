import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Typography, TextField } from "@mui/material";
import LoginModal from "./LoginModal";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSignup = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, birthYear }),
      });
      if (res.ok) {
        alert("Account created! You can now log in.");
        navigate("/");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Error signing up");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: { xs: 4, md: 8 },
        p: { xs: 3, md: 4 },
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 4, right: 8 }}>
        <Button
          size={isXs ? "small" : "medium"}
          variant="contained"
          onClick={handleLoginOpen}
        >
          {user ? `Logged in as ${user.username}` : "Login"}
        </Button>
      </div>
      <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      <Typography
        variant={isXs ? "h6" : "h5"}
        mb={2}
        textAlign={isXs ? "center" : "left"}
      >
        Create Account
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Birth Year"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
    </Box>
  );
}
