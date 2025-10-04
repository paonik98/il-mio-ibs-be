import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Token mancante");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
  };
  req.userId = decoded.id;
  next();
};
