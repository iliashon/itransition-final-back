import TCreateCollectionData from "../../types/collection/TCreateCollectionData";
import { PrismaClient } from "@prisma/client";
import TCollectionData from "../../types/collection/TCollectionData";
import TCollectionType from "../../types/collection/TCollectionType";

const db = new PrismaClient();

class CollectionService {
    async create(
        data: TCreateCollectionData,
        userId: number,
    ): Promise<TCollectionData> {
        return db.collection.create({
            data: {
                ...data,
                user_id: userId,
            },
        });
    }

    async delete(id: number): Promise<TCollectionData> {
        return db.collection.delete({
            where: {
                id,
            },
        });
    }

    async getById(id: number) {
        return db.collection.findFirst({
            where: {
                id,
            },
        });
    }

    async getAll(): Promise<TCollectionData[]> {
        return db.collection.findMany();
    }

    async getAllType(): Promise<TCollectionType[]> {
        return db.collection_type.findMany();
    }

    async createType(name: string) {
        return db.collection_type.create({
            data: {
                name,
            },
        });
    }

    async update(
        data: TCreateCollectionData,
        id: number,
    ): Promise<TCollectionData> {
        return db.collection.update({
            where: {
                id: id,
            },
            data,
        });
    }
}

export default new CollectionService();
