import React from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ open, handleClose }) {
  const [username, setUsername] = React.useState("");
  const [birthYear, setBirthYear] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, birthYear }),
      });
      if (res.ok) {
        //login success
        alert("Login successful!");
        handleClose();
      } else {
        //login failed
        const data = await res.json();
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  const handleSignUp = () => {
    handleClose();
    navigate("/signup");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 300,
        }}
      >
        <Typography variant="h6" mb={2}>
          Login
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSignUp}
          sx={{ mt: 2 }}
        >
          Sign Up / Create Account
        </Button>
      </Box>
    </Modal>
  );
}
