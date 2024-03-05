import express from "express";

const router = express.Router();

router.route("/").get((req, res, next) => {
    res.send("Get all items");
});

router
    .route("/:id")
    .get((req, res, next) => {
        res.send(`Get item ID: ${req.params.id}`);
    })
    .post((req, res, next) => {
        res.send(`Create item ID: ${req.params.id}`);
    })
    .put((req, res, next) => {
        res.send(`Update item ID: ${req.params.id}`);
    })
    .delete((req, res, next) => {
        res.send(`Delete item ID: ${req.params.id}`);
    });

export default router;
