import { body } from "express-validator";
import User from "../models/user.ts";

export const signUpRules = [
  body("email")
    .isEmail()
    .withMessage("Email musí byť validný.")
    .custom((value: String, { req }) =>
      User.findOne({ email: value }).then((user: object | undefined) => {
        if (user) {
          return Promise.reject("Email už existuje.");
        }
      })
    ),

  body("password").trim().isLength({ min: 5 }),

  body("name").trim().not().isEmpty(),
];
