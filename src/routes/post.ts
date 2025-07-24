import express from "express";
import postController from "./../controllers/postController.ts";
import multer from "./../plugins/multer.ts";
import { storeRules } from "./../validators/post.ts";

const router = express.Router();

router.get("/", postController.index);
router.get("/:id", postController.show);
router.put("/:id", storeRules, postController.update);
router.delete("/:id", postController.delete);
router.post("/", multer().single("imageUrl"), storeRules, postController.store);

export default router;
