import React, { useContext } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function LoginModal({ open, handleClose }) {
  const [username, setUsername] = React.useState(
    () => localStorage.getItem("username") || ""
  );
  const [birthYear, setBirthYear] = React.useState(
    () => localStorage.getItem("birthYear") || ""
  );
  const [remember, setRemember] = React.useState(
    () => !!localStorage.getItem("rememberLogin")
  );
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // get user and setUser from context

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
        const userData = await res.json();
        setUser(userData.user);
        if (remember) {
          localStorage.setItem("username", username);
          localStorage.setItem("birthYear", birthYear);
          localStorage.setItem("rememberLogin", "true");
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("birthYear");
          localStorage.removeItem("rememberLogin");
        }
        handleClose();
      } else {
        const data = await res.json();
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  const handleLogout = () => {
    setUser(null);
    handleClose();
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
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {user ? (
          <>
            <Typography variant="h6" mb={2}>
              Welcome, {user.username}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 2 }}
              type="submit"
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
          </>
        )}
      </Box>
    </Modal>
  );
}
