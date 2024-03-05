import express from "express";

const router = express.Router();

router.route("/").get((req, res, next) => {
    res.send("Get all collections");
});

router
    .route("/:id")
    .get((req, res, next) => {
        res.send(`Get collection ID: ${req.params.id}`);
    })
    .post((req, res, next) => {
        res.send(`Create collection ID: ${req.params.id}`);
    })
    .put((req, res, next) => {
        res.send(`Update collection ID: ${req.params.id}`);
    })
    .delete((req, res, next) => {
        res.send(`Delete collection ID: ${req.params.id}`);
    });

export default router;
