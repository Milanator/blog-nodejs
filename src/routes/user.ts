import express from "express";
import userController from "./../controllers/userController.ts";
import { signUpRules,loginRules } from "../validators/user.ts";

const router = express.Router();

router.put("/signup", signUpRules, userController.signup);
router.post("/login", loginRules, userController.login);

export default router;
