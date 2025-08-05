import express from "express";
import fileController from "./../controllers/fileController.ts";
import multer from "./../plugins/multer.ts";

const router = express.Router();

router.post("/", multer().single("imageUrl"), fileController.store);

export default router;
