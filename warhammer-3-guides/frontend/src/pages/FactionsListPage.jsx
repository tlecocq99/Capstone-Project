import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import FactionCard from "../components/FactionCard";
import RandomFactionSlot from "../components/RandomFactionSlot";

function FactionsListPage() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [race, setRace] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [openRandomModal, setOpenRandomModal] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, savedFactions, setSavedFactions } = useContext(UserContext);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const navigate = useNavigate();

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

  // Dummy data for races and difficulties if not defined elsewhere
  const races = useMemo(
    () => [
      "Empire",
      "Dwarfs",
      "High Elves",
      "Dark Elves",
      "Chaos Dwarfs",
      "Lizardmen",
      "Skaven",
      "Tomb Kings",
      "Ogre Kingdoms",
      "Vampire Coast",
    ],
    []
  );
  const difficulties = useMemo(
    () => ["Easy", "Normal", "Hard", "Legendary"],
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data));
  }, []);

  // Filtering logic
  const filtered = useMemo(() => {
    return factions.filter((f) => {
      const matchesSearch =
        (f.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (f.race?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesRace = race ? f.race === race : true;
      const matchesDifficulty = difficulty ? f.difficulty === difficulty : true;
      return matchesSearch && matchesRace && matchesDifficulty;
    });
  }, [factions, search, race, difficulty]);

  const handleRaceChange = (e) => setRace(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleClearFilters = () => {
    setRace("");
    setDifficulty("");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh", // instead of minHeight
        backgroundImage: "url('/splashArt.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <Button variant="contained" color="primary" onClick={handleLoginOpen}>
          {user ? `Logged in as ${user.username}` : "Login"}
        </Button>
      </div>
      <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      <Typography
        backgroundColor={"rgba(0, 0, 0, 0.5)"}
        fontFamily={"Manufacturing Consent"}
        sx={{
          color: "white",
          textShadow: "2px 10px 2px #000, 0 0 2px #222",
        }}
        variant="h1"
        align="center"
        gutterBottom
      >
        Warhammer 3 Faction Guides
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Search for a faction, lord, or race..."
          margin="none"
          sx={{ backgroundColor: "white", mb: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          color="primary"
          sx={{ minWidth: 120 }}
          onClick={() => setFilterOpen(true)}
        >
          Filters
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenRandomModal(true)}
        >
          Feeling Frisky? (Random Faction)
        </Button>

        {/* Saved Factions Dropdown */}
        {user && (
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="saved-factions-label">Saved Factions</InputLabel>
            <Select
              labelId="saved-factions-label"
              label="Saved Factions"
              defaultValue=""
              sx={{ backgroundColor: "rgba(145, 164, 223, 1)" }}
            >
              {savedFactions.length === 0 ? (
                <MenuItem value="" disabled>
                  No saved factions yet.
                </MenuItem>
              ) : (
                savedFactions.map((slug) => {
                  const faction = factions.find((f) => f.slug === slug);
                  return (
                    <MenuItem key={slug} value={slug}>
                      <Link
                        to={`/factions/${slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "#1976d2",
                          fontWeight: 500,
                        }}
                      >
                        {faction && faction.icon_url && (
                          <img
                            src={faction.icon_url}
                            alt={faction.faction + " logo"}
                            style={{
                              width: 24,
                              height: 24,
                              marginRight: 8,
                              borderRadius: 4,
                            }}
                          />
                        )}
                        {faction ? faction.faction : slug}
                      </Link>
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
        )}

        <RandomFactionSlot
          factions={factions}
          open={openRandomModal}
          onClose={() => setOpenRandomModal(false)}
          navigateToFaction={(slug) => navigate(`/factions/${slug}`)}
        />
      </Box>
      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <DialogTitle>Filter Factions</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Race</InputLabel>
            <Select value={race} onChange={handleRaceChange} label="Race">
              <MenuItem value="">Any</MenuItem>
              {races.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Campaign Difficulty</InputLabel>
            <Select
              value={difficulty}
              onChange={handleDifficultyChange}
              label="Campaign Difficulty"
            >
              <MenuItem value="">Any</MenuItem>
              {difficulties.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilters}>Clear</Button>
          <Button onClick={() => setFilterOpen(false)} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ maxHeight: "73vh", overflowY: "auto", pr: 1, mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {filtered.map((f) => (
            <Grid item key={f.id}>
              <Link
                to={`/factions/${f.slug}`}
                style={{ textDecoration: "none" }}
              >
                <FactionCard faction={f} />
              </Link>
              {user &&
                (savedFactions.includes(f.slug) ? (
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleUnsaveFaction(f.slug)}
                    sx={{ mt: 1 }}
                  >
                    Unsave
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleSaveFaction(f.slug)}
                    sx={{ mt: 1 }}
                  >
                    Save
                  </Button>
                ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      {(!Array.isArray(filtered) || filtered.length === 0) && (
        <Typography>No factions found or loading...</Typography>
      )}
    </Container>
  );
}

export default FactionsListPage;
