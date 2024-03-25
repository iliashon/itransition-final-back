import { Request, Response, NextFunction } from "express";
import CollectionService from "../../services/collection/collection.service";
import ApiError from "../../exceptions/ApiError";

class CollectionController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const allCollections = await CollectionService.getAll();
            res.json(allCollections);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const collection = await CollectionService.getById(
                Number(req.params.id),
            );
            res.json(collection);
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
            const updateCollection = await CollectionService.update(
                req.body,
                Number(req.params.id),
            );
            res.json(updateCollection);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteCollection = await CollectionService.delete(
                Number(req.params.id),
            );
            res.json(deleteCollection.id);
        } catch (err) {
            next(err);
        }
    }

    async createType(req: Request, res: Response, next: NextFunction) {
        try {
            const newCollectionType = await CollectionService.createType(
                req.body.name,
            );
            res.json(newCollectionType);
        } catch (err) {
            next(err);
        }
    }

    async getAllType(req: Request, res: Response, next: NextFunction) {
        try {
            const allCollectionTypes = await CollectionService.getAllType();
            res.json(allCollectionTypes);
        } catch (err) {
            next(err);
        }
    }

    async getTop(req: Request, res: Response, next: NextFunction) {
        try {
            const topCollections = await CollectionService.getTop();
            res.json(topCollections);
        } catch (err) {
            next(err);
        }
    }

    async getUserCollection(req: Request, res: Response, next: NextFunction) {
        try {
            const collections = await CollectionService.getUserCollections(
                Number(req.headers["userId"]),
            );
            res.json(collections);
        } catch (err) {
            next(err);
        }
    }
}

export default new CollectionController();
