import express from "express";
import SearchController from "../../controllers/search/search.controller";

const router = express.Router();

router.route("/").get(SearchController.search);

export default router;
