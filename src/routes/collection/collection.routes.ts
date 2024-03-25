import express from "express";
import CollectionController from "../../controllers/collection/collection.controller";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const router = express.Router();

router
    .route("/")
    .get(CollectionController.getAll)
    .post(AuthMiddleware, CollectionController.create);

router.route("/top").get(CollectionController.getTop);
router
    .route("/user")
    .get(AuthMiddleware, CollectionController.getUserCollection);

router
    .route("/:id")
    .get(CollectionController.getById)
    .put(CollectionController.update)
    .delete(CollectionController.delete);

router
    .route("/type")
    .get(CollectionController.getAllType)
    .post(CollectionController.createType);

export default router;
