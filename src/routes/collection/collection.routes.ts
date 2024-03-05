import express from "express";
import CollectionController from "../../controllers/collection/collection.controller";

const router = express.Router();

router
    .route("/")
    .get(CollectionController.getAll)
    .post(CollectionController.create);

router
    .route("/:id")
    .get(CollectionController.getById)
    .put(CollectionController.update)
    .delete(CollectionController.delete);

export default router;
