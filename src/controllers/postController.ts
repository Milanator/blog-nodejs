import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";
import Post from "../models/post.ts";

export default class postController {
  // post list
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await Post.find().populate("userId");

      successResponse(res, { items, test: "test" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        throw new Error(validation.errors[0].msg);
      }

      const { title, text } = req.body;

      const model = new Post({ title, text, userId: req.user._id });

      await model.save();

      successResponse(res, { message: "Succesfully stored post" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
