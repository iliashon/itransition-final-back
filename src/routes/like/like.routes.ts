import express from "express";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import LikeController from "../../controllers/like/like.controller";

const router = express.Router();

router
    .route("/:id")
    .get(LikeController.getByItemId)
    .post(AuthMiddleware, LikeController.create)
    .delete(AuthMiddleware, LikeController.delete);

export default router;
