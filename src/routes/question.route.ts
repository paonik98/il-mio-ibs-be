import { Router } from "express";
import {
  createQuestion,
  getAllQuestions,
  deactivateQuestion,
} from "../controllers/question.controller";

const questionRouter = Router();

questionRouter.post("/", createQuestion);
questionRouter.get("/", getAllQuestions);
questionRouter.patch("/:id/deactivate", deactivateQuestion);

export default questionRouter;
