import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db-mongo";
import router from "./routes";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", router);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
