import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error Middleware:", err);
  return sendError(res, 500, "UNCAUGHT_ERROR", err.message);
}
