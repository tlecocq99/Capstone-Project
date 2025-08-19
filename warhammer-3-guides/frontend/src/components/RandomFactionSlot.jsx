import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";

export default function RandomFactionSlot({
  factions,
  open,
  onClose,
  onResult,
  navigateToFaction,
}) {
  const [hasSpun, setHasSpun] = useState(false);
  const displayFactions = [...factions, ...factions, ...factions];
  const centerIndex = Math.floor(displayFactions.length / 2);

  const [offset, setOffset] = useState(centerIndex - 2);
  const [isSpinning, setIsSpinning] = useState(false);
  const [stoppedOffset, setStoppedOffset] = useState(null);
  const timerRef = useRef();

  // Determine which faction is in the center (selected)
  const displayOffset = stoppedOffset === null ? offset : stoppedOffset;
  const selectedFaction = factions.length
    ? factions[(displayOffset + 2) % factions.length]
    : null;

  useEffect(() => {
    if (open) {
      // Reset on open
      setHasSpun(false);
      setOffset(centerIndex - 2);
      setIsSpinning(false);
      setStoppedOffset(null);
    }
  }, [open, centerIndex]);

  // Spin the "slot machine"
  const handleSpin = () => {
    setHasSpun(true);
    if (isSpinning) return;
    setIsSpinning(true);
    setStoppedOffset(null);

    let spins = Math.floor(30 + Math.random() * 10); // Randomize number of spins
    let currOffset = offset;
    let speed = 50; // ms

    function spinStep() {
      currOffset = (currOffset + 1) % factions.length;
      setOffset(centerIndex - 2 + currOffset);
      spins--;

      if (spins > 0) {
        timerRef.current = setTimeout(spinStep, speed);
      } else {
        setIsSpinning(false);
        setStoppedOffset(centerIndex - 2 + currOffset);
      }
    }

    spinStep();
  };

  // Cleanup timeout if component unmounts
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Render 5 factions at a time, with the center one "selected"
  const visibleFactions = displayFactions.slice(
    displayOffset,
    displayOffset + 5
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle align="center" sx={{ fontWeight: 700 }}>
        Which Faction Will You Get?
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          {visibleFactions.map((f, idx) => (
            <Box
              key={f.id + "_" + idx}
              sx={{
                p: 1,
                my: 0.3,
                borderRadius: 1,
                background:
                  idx === 2 ? "rgba(56, 133, 219, 0.12)" : "transparent",
                color: idx === 2 ? "#2563eb" : "inherit",
                fontWeight: idx === 2 ? 700 : 400,
                fontSize: idx === 2 ? "1.25rem" : "1rem",
                textAlign: "center",
                transition: "all 0.15s",
              }}
            >
              {f.faction} {f.lord && <>({f.lord})</>}
            </Box>
          ))}
        </Box>
        {selectedFaction && hasSpun && (
          <Typography
            align="center"
            sx={{ mt: 2, fontSize: "1.2rem", fontWeight: "bold" }}
          >
            🎉 <b>{selectedFaction.faction}</b> — <b>{selectedFaction.lord}</b>{" "}
            🎉
          </Typography>
        )}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 3, mb: 1 }}
        >
          <Button variant="outlined" onClick={onClose} disabled={isSpinning}>
            CLOSE
          </Button>
          <Button
            variant="contained"
            onClick={handleSpin}
            disabled={isSpinning}
          >
            SPIN
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => navigateToFaction(selectedFaction?.slug)}
            disabled={!hasSpun || !selectedFaction || isSpinning}
          >
            GO TO FACTION
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
