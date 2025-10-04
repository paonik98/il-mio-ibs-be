import { Request, Response } from "express";
import { Question } from "../models/question.model";
import { sendError, sendSuccess } from "../utils/response";

/**
 * @desc    Crea una nuova domanda
 * @route   POST /api/questions
 */
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return sendError(
        res,
        400,
        "ERROR_SERVER",
        "Il campo 'text' è obbligatorio."
      );
    }

    const question = await Question.create({ text });

    return sendSuccess(res, question, "createQuestion success");
  } catch (error) {
    console.error("Errore nella creazione della domanda:", error);
    return sendError(res, 500, "ERROR_SERVER", (error as Error).message);
  }
};

/**
 * @desc    Restituisce tutte le domande
 * @route   GET /api/questions
 */
export const getAllQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await Question.find().sort({ _id: 1 });
    return sendSuccess(res, questions, "getAllQuestions success");
  } catch (error) {
    console.error("Errore nel recupero delle domande:", error);
    return sendError(res, 500, "ERROR_SERVER", (error as Error).message);
  }
};

/**
 * @desc    Disattiva (setta isActive = false) una domanda
 * @route   PATCH /api/questions/:id/deactivate
 */
export const deactivateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!question) {
      return sendError(res, 404, "ERROR_SERVER", "Domanda non trovata.");
    }

    return sendSuccess(res, question, "deactivateQuestion success");
  } catch (error) {
    console.error("Errore nella disattivazione della domanda:", error);
    return sendError(res, 500, "ERROR_SERVER", (error as Error).message);
  }
};
