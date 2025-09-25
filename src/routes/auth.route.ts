import { Router } from "express";
import { register, login, wakeUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/wakeUp", wakeUp);

export default authRouter;
