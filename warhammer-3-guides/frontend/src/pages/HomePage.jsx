import RandomFactionSlot from "../components/RandomFactionSlot";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Fade, Container, Paper } from "@mui/material";

export default function HomePage() {
  const [factions, setFactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data));
  }, []);

  return (
    <Fade in={true} timeout={2000}>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/splashArt.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", sm: 500 },
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              color: "white",
              textShadow: "2px 4px 12px #000, 0 0 2px #222",
              fontFamily: "Playfair Display",
              textAlign: "center",
            }}
          >
            Warhammer 3 Guides
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              color: "white",
              textShadow: "1px 2px 6px #000",
              textAlign: "center",
            }}
          >
            Your one-stop-shop for detailed faction guides.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mb: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setModalOpen(true)}
              sx={{
                mb: 3,
                background: "linear-gradient(90deg, #b71c1c 0%, #222 100%)",
                backgroundImage:
                  "linear-gradient(90deg, #b71c1c 0%, #222 100%)",
                backgroundColor: "transparent",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                "&:hover": {
                  background: "linear-gradient(90deg, #222 0%, #b71c1c 100%)",
                  backgroundImage:
                    "linear-gradient(90deg, #222 0%, #b71c1c 100%)",
                  backgroundColor: "transparent",
                },
              }}
            >
              Feeling frisky? (Random Faction)
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/factions")}
              sx={{
                mb: 3,
                background: "linear-gradient(90deg, #1976d2 0%, #222 100%)",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                "&:hover": {
                  background: "linear-gradient(90deg, #222 0%, #1976d2 100%)",
                },
              }}
            >
              View all factions
            </Button>
            <RandomFactionSlot
              factions={factions}
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              navigateToFaction={(slug) => navigate(`/factions/${slug}`)}
            />
          </Box>
          <Button
            variant="text"
            onClick={() => navigate("/feedback")}
            sx={{
              color: "#fff",
              textDecoration: "underline",
              mt: 2,
              fontWeight: "bold",
              textShadow: "1px 2px 6px #000",
            }}
          >
            Give us Feedback!
          </Button>
        </Paper>
      </Container>
    </Fade>
  );
}
