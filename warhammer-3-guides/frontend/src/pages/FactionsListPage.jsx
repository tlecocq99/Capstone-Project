import React, { useEffect, useState, useMemo } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import FactionCard from "../components/FactionCard";
import RandomFactionSlot from "../components/RandomFactionSlot";

export default function FactionsListPage() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [race, setRace] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [openRandomModal, setOpenRandomModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const races = useMemo(
    () => [...new Set(factions.map((f) => f.race))].sort(),
    [factions]
  );
  const difficultyOrder = ["Easy", "Normal", "Hard"];
  const difficulties = [...new Set(factions.map((f) => f.difficulty))].sort(
    (a, b) => difficultyOrder.indexOf(a) - difficultyOrder.indexOf(b)
  );

  const getFilteredFactions = () =>
    factions.filter(
      (f) =>
        f &&
        typeof f.faction === "string" &&
        typeof f.lord === "string" &&
        typeof f.race === "string" &&
        (f.faction.toLowerCase().includes(search.toLowerCase()) ||
          f.lord.toLowerCase().includes(search.toLowerCase()) ||
          f.race.toLowerCase().includes(search.toLowerCase())) &&
        (race ? f.race === race : true) &&
        (difficulty ? f.difficulty === difficulty : true)
    );

  const filtered = getFilteredFactions();

  // Filter controls handlers
  const handleRaceChange = (e) => setRace(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleClearFilters = () => {
    setRace("");
    setDifficulty("");
    setFilterOpen(false);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundImage: "url('/splashArt.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
