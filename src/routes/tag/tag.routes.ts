import express from "express";
import TagController from "../../controllers/tag/tag.controller";

const router = express.Router();

router.route("/").get(TagController.getAll).post().delete();

router.route("/cloud").get(TagController.getTagsForCloud);

export default router;
