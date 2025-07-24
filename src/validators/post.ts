import { check } from "express-validator";

export const storeRules = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Názov musí mať aspoň 3 znaky")
    .trim(),

  check("text")
    .isLength({ min: 3, max: 400 })
    .withMessage("Text obsahuje min 3 a max 400 znakov"),
];
