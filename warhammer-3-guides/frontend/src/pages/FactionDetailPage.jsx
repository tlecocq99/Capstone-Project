import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, Button } from "@mui/material";
import LoginModal from "./LoginModal";
import { UserContext } from "../contexts/UserContext";

function FactionDetailPage() {
  const { slug } = useParams();
  const [faction, setFaction] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, savedFactions, setSavedFactions } = useContext(UserContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  // Save/Unsave logic
  const handleSaveFaction = async (slug) => {
    if (!user) return;
    const res = await axios.post(
      "http://localhost:3001/api/auth/save-faction",
      {
        username: user.username,
        factionSlug: slug,
      }
    );
    if (res.data.success) setSavedFactions(res.data.savedFactions);
  };

  const handleUnsaveFaction = async (slug) => {
    if (!user) return;
    const res = await axios.post(
      "http://localhost:3001/api/auth/unsave-faction",
      {
        username: user.username,
        factionSlug: slug,
      }
    );
    if (res.data.success) setSavedFactions(res.data.savedFactions);
  };
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
      <div style={{ position: "absolute", top: 4, right: 8 }}>
        <Button
          size={isXs ? "small" : "medium"}
          variant="contained"
          color="primary"
          onClick={handleLoginOpen}
        >
          {user ? `Logged in as ${user.username}` : "Login"}
        </Button>
      </div>
      <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 4, md: 8 },
          mb: { xs: 4, md: 8 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: "auto", md: "80vh" },
          backgroundColor: "rgba(17, 11, 11, 0.07)",
          borderRadius: 3,
          boxShadow: "0 2px 16px 0 rgba(34, 34, 34, 0.69)",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
            width: "100%",
            background: "#fff",
          }}
        >
          <Typography
            variant={isXs ? "h5" : "h4"}
            gutterBottom
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            {faction.faction} — {faction.lord}
          </Typography>
          <img
            src={faction.icon_url}
            alt={faction.faction}
            style={{
              width: isXs ? 80 : 100,
              height: isXs ? 80 : 100,
              objectFit: "contain",
              marginBottom: 16,
              display: "block",
              marginLeft: isXs ? "auto" : 0,
              marginRight: isXs ? "auto" : 0,
            }}
          />
          <Typography variant={isXs ? "subtitle1" : "h6"} mt={2}>
            Race: {faction.race}
          </Typography>
          <Typography
            variant="body1"
            mt={2}
            sx={{ textAlign: { xs: "justify", md: "left" } }}
          >
            {faction.summary}
          </Typography>
          <Typography variant={isXs ? "subtitle2" : "subtitle1"} mt={2}>
            Starting Position: {faction.start_position}
          </Typography>
          <Typography variant="subtitle2" mt={1}>
            Difficulty: {faction.difficulty}
          </Typography>
          <Typography variant="subtitle2" mt={1}>
            DLC Required: {faction.dlc_required}
          </Typography>
          <Typography
            variant="body2"
            mt={2}
            component={"div"}
            sx={{ fontSize: { xs: "0.85rem", md: "0.9rem" } }}
          >
            <strong>Tips:</strong>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
              {faction.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </Typography>
          {/* Save/Unsave Button */}
          {/* Button Row: Back to Factions (left), Save/Unsave (right) */}
          <div
            style={{
              display: "flex",
              justifyContent: isXs ? "center" : "space-between",
              alignItems: "center",
              marginTop: 32,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Button
              component={Link}
              to="/factions"
              variant="contained"
              size={isXs ? "small" : "medium"}
            >
              Back to Factions
            </Button>
            {user &&
              (savedFactions.includes(faction.slug) ? (
                <Button
                  size={isXs ? "small" : "medium"}
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleUnsaveFaction(faction.slug)}
                >
                  Unsave
                </Button>
              ) : (
                <Button
                  size={isXs ? "small" : "medium"}
                  color="primary"
                  variant="contained"
                  onClick={() => handleSaveFaction(faction.slug)}
                >
                  Save
                </Button>
              ))}
          </div>
        </Paper>
        {/* ...existing code... */}
      </Container>
    </>
  );
}

export default FactionDetailPage;
