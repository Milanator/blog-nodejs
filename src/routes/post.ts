import express from "express";
import postController from "./../controllers/postController.ts";
import multer from "./../plugins/multer.ts";
import { storeRules } from "./../validators/post.ts";
import isAuthenticated from "./../middlewares/authenticated.ts";

const router = express.Router();

router.get("/", isAuthenticated, postController.index);
router.get("/:id", isAuthenticated, postController.show);
router.put("/:id", isAuthenticated, storeRules, postController.update);
router.delete("/:id", isAuthenticated, postController.delete);
router.post(
  "/",
  multer().single("imageUrl"),
  isAuthenticated,
  storeRules,
  postController.store
);

export default router;
