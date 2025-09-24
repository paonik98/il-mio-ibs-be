import { Request, Response } from "express";
import User from "../models/user.model";
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Utente registrato correttamente" });
  } catch (err) {
    res.status(400).json({ error: "Errore durante la registrazione" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email o password non corretti" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Email o password non corretti" });

    // Qui puoi generare un token JWT se vuoi
    res.json({ message: "Login riuscito", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};
