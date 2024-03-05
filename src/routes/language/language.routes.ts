import express from "express";
import LanguageController from "../../controllers/language/language.controller";

const router = express.Router();

router.route("/").get(LanguageController.getAll);

export default router;
