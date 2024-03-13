import TCreateCollectionData from "../../types/collectionTypes/TCreateCollectionData";
import { PrismaClient } from "@prisma/client";
import TCollectionData from "../../types/collectionTypes/TCollectionData";

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
}

export default new CollectionService();
