import express from "express";
import ItemController from "../../controllers/item/item.controller";

const router = express.Router();

router.route("/").get(ItemController.getAll).post(ItemController.create);

router
    .route("/:id")
    .get(ItemController.getById)
    .put(ItemController.update)
    .delete(ItemController.delete);

export default router;
