import TCreateCollectionData from "../../types/collection/TCreateCollectionData";
import { PrismaClient } from "@prisma/client";
import TCollectionData from "../../types/collection/TCollectionData";
import TCollectionType from "../../types/collection/TCollectionType";
import TAttributeData from "../../types/collection/TAttributeData";

const db = new PrismaClient();

const SELECT_COLLECTION = {
    id: true,
    user: {
        select: {
            first_name: true,
            last_name: true,
            email: true,
        },
    },
    user_id: true,
    name: true,
    description: true,
    type: true,
    image_url: true,
    created_at: true,
    _count: {
        select: {
            item: true,
        },
    },
};

class CollectionService {
    async create(
        data: TCreateCollectionData,
        userId: number,
    ): Promise<TCollectionData> {
        const { name, type, image_url, attributes, description } = data;

        const newCollection: TCollectionData = await db.collection.create({
            data: {
                name,
                type,
                image_url,
                description,
                user_id: userId,
            },
        });

        await db.attribute.createMany({
            data: attributes.map((atr) => {
                {
                    return { ...atr, collection_id: newCollection.id };
                }
            }),
        });

        return newCollection;
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
            select: SELECT_COLLECTION,
        });
    }

    async getAll(): Promise<TCollectionData[]> {
        return db.collection.findMany({
            select: SELECT_COLLECTION,
        });
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

    async getTop() {
        return db.collection.findMany({
            select: SELECT_COLLECTION,
            orderBy: {
                item: {
                    _count: "desc",
                },
            },
            take: 5,
        });
    }

    async getUserCollections(user_id: number) {
        return db.collection.findMany({
            where: {
                user_id,
            },
            select: {
                ...SELECT_COLLECTION,
                user: false,
            },
        });
    }
}

export default new CollectionService();
