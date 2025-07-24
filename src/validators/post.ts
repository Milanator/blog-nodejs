import { check } from "express-validator";

export const storeRules = [
  check("text")
    .isLength({ min: 3, max: 400 })
    .withMessage("Text obsahuje min 3 a max 400 znakov"),
];
