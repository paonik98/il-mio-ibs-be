import { Request, Response } from "express";
import User from "../models/user.model";

// Lista tutti gli utenti
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // esclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

// Dettaglio utente per ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "Utente non trovato" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

// Aggiorna utente
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // password non aggiornata qui
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ error: "Utente non trovato" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

// Elimina utente
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Utente non trovato" });
    res.json({ message: "Utente eliminato correttamente" });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};
