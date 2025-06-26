import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import Post from "../models/post.ts";

export default class postController {
  // post list
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await Post.find();

      successResponse(res, { items });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
