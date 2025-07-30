import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";
import Post from "../models/post.ts";
import { getPagination } from "../utils/pagination.ts";
import { getError } from "../utils/error.ts";
import { canModify } from "../policies/post.policy.ts";
import websocket from "../plugins/websocket.ts";

export default class postController {
  // post list
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await Post.countDocuments();

      const { skip, perPage, currentPage, totalPages } = getPagination(
        req,
        count
      );

      // const items = await Post.find({ userId: req.user._id })
      const items = await Post.find()
        .limit(perPage)
        .skip(skip)
        .sort({ _id: "desc" })
        .populate("userId");

      return successResponse(res, {
        items,
        totalPages,
        currentPage,
      });
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
        throw getError("Image not found");
      }

      const { text } = req.body;
      const imageUrl = req.file.path;

      const model = new Post({ text, imageUrl, userId: req.user._id });

      await model.save();

      websocket.getInstance().emit("created-post", { model });

      return successResponse(res, {
        item: model,
        message: "Succesfully stored post",
      });
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
        throw getError("Post not found", 404);
      }

      return successResponse(res, post);
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      // extra authorization
      const post = await Post.findOne({ _id: req.params.id }).select(
        "_id userId"
      );

      // policy
      if (!canModify(req.user, post)) {
        throw getError("Unauthorized", 401);
      }

      const { text } = req.body;

      post.text = text;

      await post.save();

      return successResponse(res, { message: "Succesfully updated post" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      // extra authorization
      const post = await Post.findOne({ _id: req.params.id }).select(
        "_id userId"
      );

      // policy
      if (!canModify(req.user, post)) {
        throw getError("Unauthorized", 401);
      }

      await Post.deleteOne({ _id: req.params.id });

      return successResponse(res, { message: "Succesfully deleted post" });
    } catch (exception: any) {
      next(exception);
    }
  }
}
