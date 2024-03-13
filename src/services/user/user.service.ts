import { PrismaClient } from "@prisma/client";
import TUserData from "../../types/authTypes/TUserData";

const db = new PrismaClient();

class UserService {
    async getUser(email: string): Promise<TUserData | null> {
        return db.user.findFirst({
            where: {
                email: email,
            },
        });
    }
}

export default new UserService();
