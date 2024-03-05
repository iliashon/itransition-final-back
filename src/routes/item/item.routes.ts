import express from "express";

const router = express.Router();

router
    .route("/")
    .get((req, res, next) => {
        res.send("Get item");
    })
    .post((req, res, next) => {
        res.send("Post item");
    })
    .put((req, res, next) => {
        res.send("Put item");
    })
    .delete((req, res, next) => {
        res.send("Delete item");
    });

export default router;
