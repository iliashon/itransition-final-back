import express from "express";
import CommentController from "../../controllers/comment/comment.controller";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const router = express.Router();

router.route("/").post(AuthMiddleware, CommentController.create);

router.route("/:id").get(CommentController.getByItemId);

export default router;
