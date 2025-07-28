import express from "express";
import userController from "./../controllers/userController.ts";
import { signUpRules } from "../validators/user.ts";

const router = express.Router();

router.put("/signup", signUpRules, userController.signup);

export default router;
