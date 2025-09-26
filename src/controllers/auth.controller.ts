import { Request, Response } from "express";
import User from "../models/user.model";

export const wakeUp = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    console.log(`Called wake up api at ${now.toISOString()}`);
    res.status(201).json({ message: "Api wakeUp : OK" });
  } catch (err) {
    res.status(400).json({ error: "api wakeUp : Error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, avatarColor, dateOfBirth } =
      req.body;
    const dateInDate = new Date(dateOfBirth);
    dateInDate.setUTCHours(0, 0, 0, 0);
    const user = new User({
      name,
      surname,
      email,
      password,
      avatarColor,
      dateOfBirth: dateInDate,
    });
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
