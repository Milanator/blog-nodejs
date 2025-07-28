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
  exception: Error,
  data: Array<any> | undefined = undefined,
  status: number = 500
) => {
  return res.status(status).json({
    message: exception.message,
    data,
    error: 1,
  });
};
