import { NextFunction, Request, Response } from "express";
import TagService from "../../services/tag/tag.service";

class TagController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tags = await TagService.getAll();
            res.json(tags);
        } catch (err) {
            next(err);
        }
    }
}

export default new TagController();
