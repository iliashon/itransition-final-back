import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

class LikeService {
    create(item_id: number, user_id: number) {
        return db.like.create({
            data: {
                user_id,
                item_id,
            },
        });
    }

    getByItemId(item_id: number) {
        return db.like.findMany({
            where: {
                item_id,
            },
        });
    }

    delete(like_id: number) {
        return db.like.delete({
            where: {
                id: like_id,
            },
        });
    }
}

export default new LikeService();
