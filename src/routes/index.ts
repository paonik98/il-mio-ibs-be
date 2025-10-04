import { Router } from "express";
import authRouter from "./auth.route";
import articleRoutes from "./article.route";
import userRoutes from "./user.routes";
import questionRouter from "./question.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/article", articleRoutes);
router.use("/user", userRoutes);
router.use("/question", questionRouter);

export default router;
