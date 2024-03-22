import { PrismaClient } from "@prisma/client";
import TCreateItemData from "../../types/item/TCreateItemData";
import TObjectSearchItem from "../../types/item/TObjectSearchItem";
import TItemData from "../../types/item/TItemData";

const db = new PrismaClient();

class ItemService {
    async create(data: TCreateItemData) {
        return db.item.create({
            data: {
                ...data,
            },
        });
    }

    async update(data: TCreateItemData, id: number) {
        return db.item.update({
            where: {
                id,
            },
            data,
        });
    }

    async getById(id: number) {
        const item = await db.item.findFirst({
            where: {
                id,
            },
        });

        const dbTags = await db.item_tag.findMany({
            where: {
                item_id: id,
            },
            select: {
                tag: true,
            },
        });

        const tags = dbTags.map((item) => {
            return {
                id: item.tag.id.toString(),
                text: item.tag.text,
            };
        });

        return {
            ...item,
            tags,
        };
    }

    async getAll(objectSearch: TObjectSearchItem): Promise<TItemData[]> {
        return db.item.findMany({
            where: {
                ...objectSearch,
            },
        });
    }

    async delete(id: number) {
        return db.item.delete({
            where: {
                id,
            },
        });
    }
}

export default new ItemService();
