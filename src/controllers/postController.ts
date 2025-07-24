import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";
import Post from "../models/post.ts";

export default class postController {
  // post list
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const model = new Post();

      const items = await Post.find().sort({ _id: "desc" }).populate("userId");

      items.map((item: object) => model.setImageUrl(item));

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

      const { text } = req.body;
      const imageUrl = req.file.path;

      const model = new Post({ text, imageUrl, userId: req.user._id });

      await model.save();

      return successResponse(res, { message: "Succesfully stored post" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await Post.findById(req.params.id).select(
        "_id text imageUrl"
      );

      if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;

        throw error;
      }

      return successResponse(res, new Post().setImageUrl(post));
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.body;

      Post.updateOne({ _id: req.params.id }, { $set: { text } });

      return successResponse(res, { message: "Succesfully updated post" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
     try {
      await Post.deleteOne({ _id: req.params.id });

      return successResponse(res, { message: "Succesfully deleted post" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
