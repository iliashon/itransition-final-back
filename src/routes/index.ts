import express from "express";
import authRoutes from "./auth/auth.routes";
import collectionRoutes from "./collection/collection.routes";
import itemRoutes from "./item/item.routes";
import languageRoutes from "./language/language.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/collection", collectionRoutes);

router.use("/item", itemRoutes);

router.use("/language", languageRoutes);

export default router;
