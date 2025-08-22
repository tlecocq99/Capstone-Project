import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Warhammer 3 Factions API",
      version: "1.0.0",
      description: "API for managing Warhammer 3 factions",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      schemas: {
        Faction: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            race: { type: "string" },
            description: { type: "string" },
            icon_url: { type: "string" },
            dlc: { type: "string" },
            difficulty: { type: "string" },
            slug: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./routes/factionsRoutes.js"], //
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

import connectDB from "./config/db.js";
import Faction from "./models/Faction.js";
import factionsRoutes from "./routes/factionsRoutes.js";
import { fetchAndStoreFactions } from "./services/fetchExternalData.js";
import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/api-docs", serve, setup(swaggerSpec));

// Connect to MongoDB
async function startServer() {
  try {
    await connectDB(); //Server will not start until it connects to the MongoDB database

    // Seed DB from external API if empty - If the database is empty, it calls services/fetchExternalData.js to fetch faction data from an external API and populate the database
    const count = await Faction.countDocuments();
    if (count === 0) {
      await fetchAndStoreFactions();
      console.log("✅ Database seeded from external API");
    }

    // Routes
    app.use("/api/factions", factionsRoutes);
    app.use("/api/auth", authRoutes); // Authentication routes
    app.use("/api/feedback", feedbackRoutes); // Feedback routes

    // Test route to verify POST works
    app.post("/test", (req, res) => res.json({ message: "Test route works!" }));

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
