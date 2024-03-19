import express from "express";
import CollectionController from "../../controllers/collection/collection.controller";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const router = express.Router();

router
    .route("/")
    .get(CollectionController.getAllType)
    .post(CollectionController.createType);

export default router;
