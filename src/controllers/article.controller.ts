import { Request, Response } from "express";
import Article from "../models/article.model";
import { sendError, sendSuccess } from "../utils/response";

// Lista tutti gli articoli
export const getArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    return sendSuccess(res, articles, "getArticles success");
  } catch (err) {
    return sendError(res, 500, "ERROR_SERVER", (err as Error).message);
  }
};

// Dettaglio articolo
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!article)
      return sendError(res, 404, "ERROR_SERVER", "Articolo non trovato");
    return sendSuccess(res, article, "getArticleById success");
  } catch (err) {
    return sendError(res, 500, "ERROR_SERVER", (err as Error).message);
  }
};

// Crea articolo
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;
    const article = new Article({ title, content, author });
    await article.save();
    return sendSuccess(res, article, "createArticle success");
  } catch (err) {
    return sendError(res, 400, "ERROR_SERVER", (err as Error).message);
  }
};

// Aggiorna articolo
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const article = await Article.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).populate("author", "name email");
    if (!article)
      return sendError(res, 404, "ERROR_SERVER", "Articolo non trovato");
    return sendSuccess(res, article, "updateArticle success");
  } catch (err) {
    return sendError(res, 400, "ERROR_SERVER", (err as Error).message);
  }
};

// Elimina articolo
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article)
      return sendError(res, 404, "ERROR_SERVER", "Articolo non trovato");
    return sendSuccess(res, article, "deleteArticle success");
  } catch (err) {
    return sendError(res, 400, "ERROR_SERVER", (err as Error).message);
  }
};
