import TCreateCommentData from "../../types/comment/TCreateCommentData";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

class CommentService {
    async getByItemId(item_id: number) {
        return db.comment.findMany({
            where: {
                item_id,
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                    },
                },
                text: true,
                item_id: true,
                created_at: true,
            },
        });
    }

    async create(data: TCreateCommentData, user_id: number) {
        return db.comment.create({
            data: {
                item_id: Number(data.item_id),
                text: data.text,
                user_id,
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                    },
                },
                text: true,
                item_id: true,
                created_at: true,
            },
        });
    }
}

export default new CommentService();
