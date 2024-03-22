import express from "express";
import authRoutes from "./auth/auth.routes";
import collectionRoutes from "./collection/collection.routes";
import itemRoutes from "./item/item.routes";
import collection_typeRoutes from "./collection_type/collection_type.routes";
import commentRoutes from "./comment/comment.routes";
import likeRoutes from "./like/like.routes";
import tagRoutes from "./tag/tag.routes";
import userRoutes from "./user/user.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/collection", collectionRoutes);

router.use("/collection-type", collection_typeRoutes);

router.use("/item", itemRoutes);

router.use("/comment", commentRoutes);

router.use("/like", likeRoutes);

router.use("/tag", tagRoutes);

router.use("/user", userRoutes);

export default router;
