import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function FactionCard({ faction }) {
  if (!faction) return null;
  return (
    <Card
      variant="outlined"
      sx={{
        margin: "auto",
        my: 2,
        maxWidth: 280,
        width: "100%",
        height: 360, // Set your desired uniform height
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(30,30,30,0.7)",
        border: "2px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        backdropFilter: "blur(3px)",
      }}
    >
      <CardMedia
        component="img"
        image={faction.icon_url || "/placeholder.png"}
        alt={faction.lord || "Unknown"}
        sx={{ objectFit: "contain", background: "#222", height: 140 }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png"; // Use a fallback image if desired
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          color="white"
          fontFamily="Playfair Display"
          variant="h6"
          gutterBottom
        >
          {faction.faction || "Unknown"}{" "}
          <span style={{ fontWeight: 300 }}>({faction.lord || "Unknown"})</span>
        </Typography>
        <Typography
          fontFamily="Playfair Display"
          variant="subtitle2"
          color="white"
        >
          {faction.race || "Unknown"}
        </Typography>
        <Typography
          fontFamily="Playfair Display"
          variant="body1"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          color="white"
        >
          {faction.summary || ""}
        </Typography>
        <Typography
          fontFamily="Playfair Display"
          variant="caption"
          color="secondary"
        >
          DLC: {faction.dlc_required || "None"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FactionCard;
