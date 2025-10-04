import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db-mongo";
import router from "./routes";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/requst-logger.middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://nome-progetto.vercel.app",
  process.env.FRONTEND_LOCAL || "http://localhost:3000",
];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api", router);

// Error handling
app.use(errorMiddleware);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
