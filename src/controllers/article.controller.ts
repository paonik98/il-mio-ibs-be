import { Request, Response } from "express";
import Article from "../models/article.model";

// Lista tutti gli articoli
export const getArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
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
      return res.status(404).json({ error: "Articolo non trovato" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

// Crea articolo
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;
    const article = new Article({ title, content, author });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: "Errore nella creazione dell'articolo" });
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
      return res.status(404).json({ error: "Articolo non trovato" });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: "Errore nell'aggiornamento dell'articolo" });
  }
};

// Elimina articolo
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article)
      return res.status(404).json({ error: "Articolo non trovato" });
    res.json({ message: "Articolo eliminato correttamente" });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};
