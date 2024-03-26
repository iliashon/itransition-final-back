import { PrismaClient } from "@prisma/client";
import TCreateItemData from "../../types/item/TCreateItemData";
import TObjectSearchItem from "../../types/item/TObjectSearchItem";
import TItemData from "../../types/item/TItemData";
import TArgCreateItem from "../../types/item/TArgCreateItem";
import TReadAttributes from "../../types/item/TReadAttributes";

const db = new PrismaClient();

const SELECT_ATTRIBUTES_BY_ID = {
    atr_value_varchar: {
        select: {
            id: true,
            value: true,
            atr_id: true,
            attribute: true,
        },
    },
    atr_value_int: {
        select: {
            id: true,
            value: true,
            atr_id: true,
            attribute: true,
        },
    },
    atr_value_date: {
        select: {
            id: true,
            value: true,
            atr_id: true,
            attribute: true,
        },
    },
    atr_value_boolean: {
        select: {
            id: true,
            value: true,
            atr_id: true,
            attribute: true,
        },
    },
    atr_value_text: {
        select: {
            id: true,
            value: true,
            atr_id: true,
            attribute: true,
        },
    },
};

class ItemService {
    async create(data: TArgCreateItem) {
        const { name, image_url, collection_id, attributes } = data;

        const newItem = await db.item.create({
            data: {
                name,
                image_url,
                collection_id,
            },
        });

        for (const atr of attributes) {
            switch (atr.type) {
                case "text":
                    await db.atr_value_text.create({
                        data: {
                            value: atr.value as string,
                            atr_id: atr.atr_id,
                            item_id: newItem.id,
                        },
                    });
                    break;
                case "boolean":
                    await db.atr_value_boolean.create({
                        data: {
                            value: atr.value as boolean,
                            atr_id: atr.atr_id,
                            item_id: newItem.id,
                        },
                    });
                    break;
                case "integer":
                    await db.atr_value_int.create({
                        data: {
                            value: Number(atr.value),
                            atr_id: atr.atr_id,
                            item_id: newItem.id,
                        },
                    });
                    break;
                case "date":
                    await db.atr_value_date.create({
                        data: {
                            value: new Date(atr.value as string),
                            atr_id: atr.atr_id,
                            item_id: newItem.id,
                        },
                    });
                    break;
                case "varchar":
                    await db.atr_value_varchar.create({
                        data: {
                            value: atr.value as string,
                            atr_id: atr.atr_id,
                            item_id: newItem.id,
                        },
                    });
                    break;
            }
        }

        return newItem;
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
            select: {
                id: true,
                name: true,
                image_url: true,
                collection_id: true,
                created_at: true,
                ...SELECT_ATTRIBUTES_BY_ID,
            },
        });

        const attributes: TReadAttributes[] = [];

        const atr_value = [
            item?.atr_value_varchar,
            item?.atr_value_boolean,
            item?.atr_value_date,
            item?.atr_value_int,
            item?.atr_value_text,
        ];

        atr_value.forEach((atrs) => {
            atrs?.forEach((atr) => {
                attributes.push({
                    id: atr.id,
                    name: atr.attribute.name,
                    value: atr.value,
                    atr_id: atr.atr_id,
                    type: atr.attribute.type,
                });
            });
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
            id: item?.id,
            name: item?.name,
            image_url: item?.image_url,
            collection_id: item?.collection_id,
            created_at: item?.created_at,
            attributes,
            tags,
        };
    }

    async getAll(objectSearch: TObjectSearchItem): Promise<TItemData[]> {
        return db.item.findMany({
            where: {
                ...objectSearch,
            },
            select: {
                id: true,
                name: true,
                image_url: true,
                collection_id: true,
                created_at: true,
                _count: {
                    select: {
                        like: true,
                    },
                },
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

    async getLastItems() {
        return db.item.findMany({
            orderBy: {
                created_at: "desc",
            },
            take: 5,
        });
    }
}

export default new ItemService();
