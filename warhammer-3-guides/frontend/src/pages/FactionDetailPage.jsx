import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, Button } from "@mui/material";
import LoginModal from "./LoginModal";

export default function FactionDetailPage() {
  const { slug } = useParams();
  const [faction, setFaction] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/factions/${slug}`)
      .then((res) => setFaction(res.data))
      .catch(() => setFaction(null));
  }, [slug]);

  if (!faction) return <Typography>Loading...</Typography>;

  return (
    <>
      {/*Login button*/}
      <div style={{ position: "absolute", top: 16, right: 16 }}>
        <Button variant="contained" color="primary" onClick={handleLoginOpen}>
          Login
        </Button>
      </div>
      <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      <Container
        maxWidth="sm"
        sx={{
          mt: 8,
          mb: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "rgba(17, 11, 11, 0.07)", // light gray background
          borderRadius: 3,
          boxShadow: "0 2px 16px 0 rgba(34, 34, 34, 0.69)",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
            width: "100%",
            background: "#fff",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {faction.faction} — {faction.lord}
          </Typography>
          <img
            src={faction.icon_url}
            alt={faction.faction}
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
              marginBottom: 16,
            }}
          />
          <Typography variant="h6" mt={2}>
            Race: {faction.race}
          </Typography>
          <Typography variant="body1" mt={2}>
            {faction.summary}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            Starting Position: {faction.start_position}
          </Typography>
          <Typography variant="subtitle2" mt={1}>
            Difficulty: {faction.difficulty}
          </Typography>
          <Typography variant="subtitle2" mt={1}>
            DLC Required: {faction.dlc_required}
          </Typography>
          <Typography variant="body2" mt={2} component={"div"}>
            <strong>Tips:</strong>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
              {faction.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </Typography>
          <Button
            component={Link}
            to="/factions"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Back to Factions
          </Button>
        </Paper>
      </Container>
    </>
  );
}
