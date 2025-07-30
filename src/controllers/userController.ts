import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";
import User from "../models/user.ts";
import { getError } from "../utils/error.ts";
import { JWT_PRIVATE_KEY } from "../constants.ts";

export default class userController {
  // register
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw getError("Validation failed", 422, errors.array());
      }

      const { email, name } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({ email, password, name });

      return successResponse(res, {
        user,
        message: "User successfuly registered.",
      });
    } catch (exception: Error) {
      next(exception);
    }
  }

  // login
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw getError("Validation failed", 422, errors.array());
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      // email doesnt match
      if (!user) {
        throw getError("User with this email doesnt exist");
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      // incorrect password
      if (!matchPassword) {
        throw getError("Incorrect password", 401);
      }

      // generate token
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          _id: user._id.toString(),
        },
        JWT_PRIVATE_KEY,
        { expiresIn: "1h" }
      );

      successResponse(res, {
        token,
        user,
        message: "Succesfully authenticated",
      });
    } catch (exception: Error) {
      next(exception);
    }
  }
}
