import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { validationResult } from "express-validator";

export default class fileController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      return successResponse(res, { imageUrl: req.file.path });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
