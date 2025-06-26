import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";

export default class postController {
  // post list
  static index(req: Request, res: Response, next: NextFunction) {
    try {
      successResponse(res, { message: "A" });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
