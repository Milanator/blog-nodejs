import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_PRIVATE_KEY } from "../constants.ts";
import mongoose from "mongoose";
import { getError } from "../utils/error.ts";

export default (req: Request, res: Response, next: NextFunction) => {
  let decodedToken;

  const header = req.get("Authorization");

  if (!header) {
    throw getError("Not authenticated.");
  }

  try {
    const token = header.split(" ")[1];

    decodedToken = jwt.verify(token, JWT_PRIVATE_KEY);
  } catch (error: Error) {
    req.isAuth = false;

    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;

    return next();
  }

  req.isAuth = true;
  req.user = {
    name: decodedToken.name,
    email: decodedToken.email,
    _id: new mongoose.Types.ObjectId(decodedToken._id),
  };

  return next();
};
