import express from "express";
import postController from "../controllers/postController.ts";
import { storeRules } from "../validators/post.ts";

const router = express.Router();

router.get("/", postController.index);
router.post("/", storeRules, postController.store);

export default router;
