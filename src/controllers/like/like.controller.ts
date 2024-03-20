import { NextFunction, Request, Response } from "express";
import LikeService from "../../services/like/like.service";

class LikeController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const like = await LikeService.create(
                Number(req.params.id),
                Number(req.headers["userId"]),
            );
            res.json(like);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const like = await LikeService.delete(Number(req.params.id));
            res.json(like);
        } catch (err) {
            next(err);
        }
    }

    async getByItemId(req: Request, res: Response, next: NextFunction) {
        try {
            const likes = await LikeService.getByItemId(Number(req.params.id));
            res.json(likes);
        } catch (err) {
            next(err);
        }
    }
}

export default new LikeController();
