import express from "express";
import authRoutes from "./auth/auth.routes";
import collectionRoutes from "./collection/collection.routes";
import itemRoutes from "./item/item.routes";
import collection_typeRoutes from "./collection_type/collection_type.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/collection", collectionRoutes);

router.use("/collection-type", collection_typeRoutes);

router.use("/item", itemRoutes);

export default router;
