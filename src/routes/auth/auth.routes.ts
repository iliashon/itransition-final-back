import express from "express";
import AuthController from "../../controllers/auth/auth.controller";

const router = express.Router();

router.route("/login").post(AuthController.login);

router.route("/logout").post(AuthController.logout);

router.route("/register").post(AuthController.register);

router.route("/refresh").post(AuthController.refresh);

export default router;
