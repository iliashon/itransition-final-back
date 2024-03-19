import { NextFunction, Request, Response } from "express";
import ItemService from "../../services/item/item.service";

class ItemController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const allItems = await ItemService.getAll(req.body);
            res.json(allItems);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await ItemService.getById(Number(req.params.id));
            res.json(item);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newItem = await ItemService.create(req.body);
            res.json(newItem);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updateItem = await ItemService.update(
                req.body,
                Number(req.params.id),
            );
            res.json(updateItem);
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
