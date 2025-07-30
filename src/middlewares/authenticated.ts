import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_PRIVATE_KEY } from "./../constants.ts";
import mongoose from "mongoose";

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

  req.user = {
    name: decodedToken.name,
    email: decodedToken.email,
    _id: new mongoose.Types.ObjectId(decodedToken._id),
  };

  next();
};
