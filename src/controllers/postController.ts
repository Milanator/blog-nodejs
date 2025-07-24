import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";
import Post from "../models/post.ts";

export default class postController {
  // post list
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await Post.find().sort({ _id: "desc" }).populate("userId");

      items.map((item: object) => {
        item.imageUrl = `${process.env.BACKEND_ORIGIN}/${item.imageUrl}` 

        return item;
      });

      return successResponse(res, { items, test: "test" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validationResult(req);

      // validation error
      if (!validation.isEmpty()) {
        throw new Error(validation.errors[0].msg);
      }

      // no image
      if (!req.file) {
        const error = new Error("Image not found");
        error.statusCode = 500;

        throw error;
      }

      const { title, text } = req.body;
      const imageUrl = req.file.path;

      const model = new Post({ title, text, imageUrl, userId: req.user._id });

      await model.save();

      return successResponse(res, { message: "Succesfully stored post" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    const post = await Post.findById(req.params.id).select("_id title text");

    return res.json(post);
  }
}
