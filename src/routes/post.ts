import express from "express";
import postController from "../controllers/postController.ts";

const router = express.Router();

router.get("/", postController.index);

export default router;
