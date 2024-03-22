import express from "express";
import AuthController from "../../controllers/auth/auth.controller";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const router = express.Router();

router.route("/login").post(AuthController.login);

router.route("/logout").post(AuthController.logout);

router.route("/register").post(AuthController.register);

router.route("/refresh").post(AuthMiddleware, AuthController.refresh);

export default router;
