import { NextFunction, Request, Response } from "express";

class ItemController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.send("Get all items");
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(`Get by id item ID: ${req.params.id}`);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            res.send("Create item");
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(`Update item ID: ${req.params.id}`);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(`Delete item ID: ${req.params.id}`);
        } catch (err) {
            next(err);
        }
    }
}

export default new ItemController();
