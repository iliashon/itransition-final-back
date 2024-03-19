import { PrismaClient } from "@prisma/client";
import TCreateItemData from "../../types/itemTypes/TCreateItemData";
import TObjectSearchItem from "../../types/itemTypes/TObjectSearchItem";
import TItemData from "../../types/itemTypes/TItemData";

const db = new PrismaClient();

class ItemService {
    async create(data: TCreateItemData) {
        return db.item.create({
            data: {
                ...data,
            },
        });
    }

    async getById(id: number) {
        return db.item.findFirst({
            where: {
                id,
            },
        });
    }

    async getAll(objectSearch: TObjectSearchItem): Promise<TItemData[]> {
        return db.item.findMany({
            where: {
                ...objectSearch,
            },
        });
    }
}

export default new ItemService();
