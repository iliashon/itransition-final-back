import { NextFunction, Request, Response } from "express";
import CommentService from "../../services/comment/comment.service";

class CommentController {
    async getByItemId(req: Request, res: Response, next: NextFunction) {
        try {
            const comments = await CommentService.getByItemId(
                Number(req.params.id),
            );
            res.json(comments);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const comment = await CommentService.create(
                req.body,
                Number(req.headers["userId"]),
            );
            res.json(comment);
        } catch (err) {
            next(err);
        }
    }
}

export default new CommentController();
