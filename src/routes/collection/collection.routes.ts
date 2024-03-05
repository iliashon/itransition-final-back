import express from "express";

const router = express.Router();

router
    .route("/")
    .get((req, res, next) => {
        res.send("Get collection");
    })
    .post((req, res, next) => {
        res.send("Post collection");
    })
    .put((req, res, next) => {
        res.send("Put collection");
    })
    .delete((req, res, next) => {
        res.send("Delete collection");
    });

export default router;
