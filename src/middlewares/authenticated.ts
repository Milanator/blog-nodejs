import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_PRIVATE_KEY } from "./../constants.ts";

export default (req: Request, res: Response, next: NextFunction) => {
  let decodedToken;

  try {
    const token = req.get("Authorization")?.split(" ")[1];

    decodedToken = jwt.verify(token, JWT_PRIVATE_KEY);
  } catch (error: Error) {
    error.statusCode = 500;

    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;

    throw error;
  }

  req.user = { _id: decodedToken.userId };

  next();
};
