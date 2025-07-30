import type { Response } from "express";

export const successResponse = (
  res: Response,
  data: object = {},
  message: string | undefined = undefined,
  status: number = 200
) => {
  return res.status(status).json({
    data,
    message,
    error: 0,
  });
};

export const failedResponse = (
  res: Response,
  exception: Error
) => {
  return res.status(exception.statusCode || 500).json({
    message: exception.message,
    data: exception.data,
    error: 1,
  });
};
