import { Request, Response } from "express";
import User from "../models/user.model";
import { sendError, sendSuccess } from "../utils/response";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

export const wakeUp = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    console.log(`Called wake up api at ${now.toISOString()}`);
    return sendSuccess(res, { message: "Api wakeUp : OK" });
  } catch (err) {
    return sendError(res, 400, "ERROR_SERVER", (err as Error).message);
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
    return sendSuccess(res, user, "User registered successfully");
  } catch (err) {
    return sendError(res, 400, "ERROR_SERVER", (err as Error).message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 400, "ERROR_SERVER", "Email not found ");

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return sendError(res, 400, "ERROR_SERVER", "Password is incorrect ");

    // Qui puoi generare un token JWT se vuoi
    const { name, surname, avatarColor } = user;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return sendSuccess(
      res,
      { name, surname, avatarColor, token },
      "Login success"
    );
  } catch (err) {
    return sendError(res, 500, "ERROR_SERVER", (err as Error).message);
  }
};
