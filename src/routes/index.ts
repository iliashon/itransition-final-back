import express from "express";
import authRoutes from "./auth/auth.routes";
import collectionRoutes from "./collection/collection.routes";
import itemRoutes from "./item/item.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/collection", collectionRoutes);

router.use("/item", itemRoutes);

export default router;
