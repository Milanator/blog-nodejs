import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/api.ts";
import { clearFile } from "./../utils/file.ts";
import path from "path";

export default class fileController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      // remove old file path
      if (req.body.oldFilePath) {
        const oldFilePath = req.body.oldFilePath.replace(
          process.env.BACKEND_ORIGIN,
          path.resolve()
        );

        clearFile(oldFilePath);
      }

      return successResponse(res, { imageUrl: req.file.path });
    } catch (exception: any) {
      next(new Error(exception));
    }
  }
}
