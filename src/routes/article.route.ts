import { Router } from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller";

const articleRoutes = Router();

// CRUD articoli
articleRoutes.get("/", getArticles); // GET /api/articles
articleRoutes.get("/:id", getArticleById); // GET /api/articles/:id
articleRoutes.post("/", createArticle); // POST /api/articles
articleRoutes.put("/:id", updateArticle); // PUT /api/articles/:id
articleRoutes.delete("/:id", deleteArticle); // DELETE /api/articles/:id

export default articleRoutes;
