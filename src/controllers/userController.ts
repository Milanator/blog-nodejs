import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";
import User from "../models/user.ts";

export default class userController {
  // register
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();

        throw error;
      }

      const { email, name } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({ email, password, name });

      return successResponse(res, {
        user,
        message: "User successfuly registered.",
      });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
