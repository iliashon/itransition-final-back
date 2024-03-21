import { PrismaClient } from "@prisma/client";
import TTagData from "../../types/tagTypes/TTagData";
import TCreateTagData from "../../types/tagTypes/TCreateTagData";

const db = new PrismaClient();

class TagService {
    async getAll(): Promise<TTagData[]> {
        return db.tag.findMany();
    }

    async getTagsForCloud() {
        const tags = await db.tag.findMany({
            select: {
                text: true,
                _count: {
                    select: {
                        item_tag: true,
                    },
                },
            },
            orderBy: {
                item_tag: {
                    _count: "desc",
                },
            },
            take: 15,
        });
        return tags.map((tag) => {
            return { value: tag.text, count: tag._count.item_tag };
        });
    }

    async create(tags: TCreateTagData[], item_id: number) {
        const TagIds: number[] = [];

        await db.item_tag.deleteMany({
            where: {
                item_id,
            },
        });

        for (const tag of tags) {
            if (!tag.id) {
                const newTag = await db.tag.create({
                    data: {
                        text: tag.text,
                    },
                });
                TagIds.push(newTag.id);
            } else {
                TagIds.push(Number(tag.id));
            }
        }

        const itemTagData = TagIds.map((item) => {
            return {
                item_id,
                tag_id: item,
            };
        });

        await db.item_tag.createMany({
            data: itemTagData,
        });

        return;
    }
}

export default new TagService();
