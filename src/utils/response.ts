import { Response } from "express";
import { ApiResponse } from "../types/api-response";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success in request"
): Response<ApiResponse<T>> {
  return res.status(200).json({
    success: true,
    data,
    message,
  });
}

export function sendError(
  res: Response,
  code: number,
  errorCode: string,
  details?: string
): Response<ApiResponse<null>> {
  return res.status(code).json({
    success: false,
    error: {
      code: errorCode,
      details,
    },
    message: "Error in request",
  });
}
