import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useContext(UserContext);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You could POST this to your backend or just show a thank you message.
    setSubmitted(true);
    setForm({ name: "", feedback: "" });
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 420 }}>
        <Typography variant="h4" gutterBottom align="center">
          Feedback
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }} align="center">
          Hi there, thank you for visiting our page! We understand that there is
          always room for improvement, and would love to hear your thoughts on
          what we can do to improve the quality and ease-of-use of our site!
        </Typography>
        {submitted ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "green", mt: 2 }}
          >
            Thank you for your feedback!
            <br />
            We appreciate your input and will use it to improve our site.
            <br />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/factions")}
              sx={{ ml: 2 }}
            >
              Factions List
            </Button>
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name (optional)"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your Feedback"
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              fullWidth
              required
              multiline
              minRows={4}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!form.feedback.trim()}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </Box>
          </form>
        )}
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <Button variant="contained" color="primary" onClick={handleLoginOpen}>
            {user ? `Logged in as ${user.username}` : "Login"}
          </Button>
        </div>
        <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      </Paper>
    </Box>
  );
}
