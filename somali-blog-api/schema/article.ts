import { body } from "express-validator";

export const CreateArticle = [
  body("title")
    .isLength({ min: 6, max: 500 })
    .withMessage("Article title must be between six and 500 characters"),
  body("content").isLength({ min: 12 }).withMessage("Content is too short."),
  body("isPublished").isBoolean().withMessage("IsPublished must be boolean"),
];
