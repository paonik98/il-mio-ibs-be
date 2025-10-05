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

const FRONTEND_URL = process.env.FRONTEND_URL;

if (process.env.NODE_ENV === "prod") {
  console.log("🚀 CORS in modalità produzione");

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (origin === FRONTEND_URL) return callback(null, true);

        console.warn(`❌ Richiesta CORS bloccata da origine: ${origin}`);
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
  );
} else {
  console.log("🧪 CORS in modalità sviluppo");
  app.use(cors());
}

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
