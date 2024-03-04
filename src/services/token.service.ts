import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import TUserData from "../types/authTypes/TUserData";

const db = new PrismaClient();

class TokenService {
    async generateToken(data: TUserData) {
        const tokens = {
            accessToken: jwt.sign(data, process.env.JWT_ACCESS_SECRET!, {
                expiresIn: "30min",
            }),
            refreshToken: jwt.sign(data, process.env.JWT_REFRESH_SECRET!, {
                expiresIn: "30d",
            }),
        };
        await this.saveToken(data.id, tokens.refreshToken);
        return tokens;
    }

    async saveToken(userId: number, refreshToken: string) {
        const hasToken = await db.token.findFirst({
            where: {
                user_id: userId,
            },
        });
        if (hasToken) {
            await db.token.update({
                where: {
                    user_id: userId,
                },
                data: {
                    refresh_token: refreshToken,
                },
            });
        } else {
            await db.token.create({
                data: {
                    user_id: userId,
                    refresh_token: refreshToken,
                },
            });
        }
    }

    async removeToken(refreshToken: string) {
        const { id } = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!,
        ) as TUserData;
        return db.token.delete({
            where: {
                user_id: id,
            },
        });
    }
}

export default new TokenService();
