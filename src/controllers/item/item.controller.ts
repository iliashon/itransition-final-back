import { NextFunction, Request, Response } from "express";
import ItemService from "../../services/item/item.service";
import TagService from "../../services/tag/tag.service";
import TArgCreateItem from "../../types/item/TArgCreateItem";

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
            const { tags }: TArgCreateItem = req.body;

            const newItem = await ItemService.create(req.body);

            await TagService.create(tags, newItem.id);

            res.json(newItem);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { tags }: TArgCreateItem = req.body;

            const updateItem = await ItemService.update(
                req.body,
                Number(req.params.id),
            );

            await TagService.create(tags, updateItem.id);

            res.json(updateItem);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteItem = await ItemService.delete(Number(req.params.id));
            res.send(deleteItem);
        } catch (err) {
            next(err);
        }
    }

    async getLastItems(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await ItemService.getLastItems();
            res.send(items);
        } catch (err) {
            next(err);
        }
    }
}

export default new ItemController();
