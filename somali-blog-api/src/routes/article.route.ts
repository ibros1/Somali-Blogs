import { Router } from "express";
import { CreateArticle } from "../../schema/article";
import { validationMiddleware } from "../../middlewares/validation";
import { authenticate } from "../../middlewares/authenticate.middleware";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getMyArticles,
  getOneArticle,
  getOneMembersArticles,
} from "../controllers/article.controller";
import { authorize } from "../../middlewares/authorize.middleware";
const router = Router();

router.post(
  "/new",
  authenticate,
  CreateArticle,
  validationMiddleware,
  createArticle
);

router.get("/my-articles", authenticate, getMyArticles);
router.get("/list", getAllArticles);
router.get("/:articleId", getOneArticle);
router.get("/users/:userId", getOneMembersArticles);
router.delete(
  "/delete/:articleId",
  authenticate,
  authorize(["admin"]),
  deleteArticle
);
export default router;
