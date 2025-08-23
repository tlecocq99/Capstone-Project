import RandomFactionSlot from "../components/RandomFactionSlot";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Fade, Container, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const [factions, setFactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data));
  }, []);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useContext(UserContext);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fade in={true} timeout={2000}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/splashArt.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Login Button (top-right overlay) */}
        <Box sx={{ position: "absolute", top: 12, right: 16, zIndex: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginOpen}
            size={isXs ? "small" : "medium"}
          >
            {user ? `Logged in as ${user.username}` : "Login"}
          </Button>
          <LoginModal open={loginOpen} handleClose={handleLoginClose} />
        </Box>

        <Paper
          elevation={10}
          sx={{
            position: "relative",
            background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.55))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            boxShadow: "0 10px 35px -5px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 1100,
            minHeight: { xs: "auto", md: "78vh" },
            maxHeight: "88vh",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant={isXs ? "h4" : "h2"}
            gutterBottom
            sx={{
              color: "white",
              textShadow: "2px 4px 12px #000, 0 0 2px #222",
              fontFamily: "Playfair Display",
              textAlign: "center",
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Warhammer 3 Guides
          </Typography>
          <Typography
            variant={isXs ? "body1" : "subtitle1"}
            sx={{
              mb: 4,
              color: "white",
              textShadow: "1px 2px 6px #000",
              textAlign: "center",
              px: { xs: 1, md: 0 },
              maxWidth: 780,
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
              width: "100%",
              position: "relative",
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
                width: { xs: "100%", sm: "auto" },
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
                width: { xs: "100%", sm: "auto" },
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
