import { body } from "express-validator";
import User from "../models/user.ts";

export const signUpRules = [
  body("email")
    .isEmail()
    .withMessage("Email musí byť validný.")
    .custom(async (value: String, { req }) => {
      const user = await User.findOne({ email: value });

      if (user) {
        return Promise.reject("Email už existuje.");
      }

      return;
    }),

  body("password").trim().isLength({ min: 5 }),

  body("name").trim().not().isEmpty(),
];

export const loginRules = [
  body("email").isEmail().withMessage("Email musí byť validný."),

  body("password").trim().isLength({ min: 5 }),
];
