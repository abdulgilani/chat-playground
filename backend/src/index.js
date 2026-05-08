import express from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use("api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
