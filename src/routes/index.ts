import { Router } from "express";
import authRouter from "./auth.route";
import articleRoutes from "./article.route";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/article", articleRoutes);
router.use("/user", userRoutes);

export default router;
