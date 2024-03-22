import { PrismaClient } from "@prisma/client";
import TUserData from "../../types/user/TUserData";
import TUpdateUser from "../../types/user/TUpdateUser";

const db = new PrismaClient();

const SELECT_USERS = {
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    image_url: true,
    blocked: true,
    is_admin: true,
    created_at: true,
    updated_at: true,
};

class UserService {
    async getUser(email: string): Promise<TUserData | null> {
        return db.user.findFirst({
            where: {
                email: email,
            },
        });
    }

    async getById(id: number): Promise<TUserData | null> {
        return db.user.findFirst({
            where: {
                id,
            },
        });
    }

    async getAll(): Promise<TUserData[]> {
        return db.user.findMany({
            select: SELECT_USERS,
        });
    }

    async delete(data: number[]) {
        return db.user.deleteMany({
            where: {
                id: { in: data },
            },
        });
    }

    async update(data: TUpdateUser) {
        if (data.action === "block") {
            return db.user.updateMany({
                where: {
                    id: { in: data.users },
                },
                data: {
                    blocked: data.value,
                },
            });
        } else if (data.action === "admin") {
            return db.user.updateMany({
                where: {
                    id: { in: data.users },
                },
                data: {
                    is_admin: data.value,
                },
            });
        }
    }
}

export default new UserService();
