import { Request, Response, NextFunction } from "express";
import CollectionService from "../../services/collection/collection.service";

class CollectionController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.send("Get all collection");
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(`Get by id collection ID: ${req.params.id}`);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newCollection = await CollectionService.create(
                req.body,
                Number(req.headers["userId"]),
            );
            res.json(newCollection);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(`Update collection ID: ${req.params.id}`);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(`Delete collection ID: ${req.params.id}`);
        } catch (err) {
            next(err);
        }
    }
}

export default new CollectionController();
