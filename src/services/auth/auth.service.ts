import { PrismaClient } from "@prisma/client";
import type TLoginData from "../../types/authTypes/TLoginData";
import TRegisterData from "../../types/authTypes/TRegisterData";
import ApiError from "../../exceptions/ApiError";
import bcrypt from "bcrypt";
import TUserData from "../../types/authTypes/TUserData";
import TokenService from "./token.service";
import TUserAuthData from "../../types/authTypes/TUserAuthData";

const db = new PrismaClient();

const HASH_SALT = 3;

const SELECT_USER_DATA = {
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    blocked: true,
    is_admin: true,
    created_at: true,
    updated_at: true,
};

class AuthService {
    async login(data: TLoginData): Promise<TUserAuthData> {
        const user = await db.user.findFirst({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw ApiError.BadRequest("There is no user with this email");
        }

        const isPasswordEqual = await bcrypt.compare(
            data.password,
            user.password,
        );
        if (!isPasswordEqual) {
            throw ApiError.BadRequest("Incorrect password");
        }

        const tokens = await TokenService.generateToken(user);

        return {
            ...tokens,
            user: user,
        };
    }

    async logout(refreshToken: string) {
        return TokenService.removeToken(refreshToken);
    }

    async register(data: TRegisterData): Promise<TUserAuthData> {
        const hasCandidate = await db.user.findFirst({
            where: { email: data.email },
        });
        if (hasCandidate) {
            throw ApiError.BadRequest(
                `User with email address ${data.email} already exists`,
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, HASH_SALT);

        const newUser: TUserData = await db.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                first_name: data.first_name,
                last_name: data.last_name,
            },
            select: SELECT_USER_DATA,
        });

        const tokens = await TokenService.generateToken(newUser);

        return {
            ...tokens,
            user: newUser,
        };
    }

    async refresh(refreshToken: string): Promise<TUserAuthData> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const hasTokenInDb = await TokenService.findToken(refreshToken);

        if (!userData || !hasTokenInDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await db.user.findFirst({
            where: {
                id: userData.id,
            },
        });

        if (!user) {
            throw ApiError.BadRequest(
                "The user was not found, most likely the admin deleted it",
            );
        }

        const tokens = await TokenService.generateToken(user);

        return {
            ...tokens,
            user: user,
        };
    }
}

export default new AuthService();
