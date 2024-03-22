import express from "express";
import UserController from "../../controllers/user/user.controller";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const router = express.Router();

router
    .route("/")
    .get(AuthMiddleware, UserController.getAll)
    .put(AuthMiddleware, UserController.update)
    .delete(AuthMiddleware, UserController.delete);

export default router;
