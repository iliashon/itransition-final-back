import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError";
import TokenService from "../services/auth/token.service";
import UserService from "../services/user/user.service";

export default async function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const validateUserData = TokenService.validateAccessToken(accessToken);
        if (!validateUserData) {
            return next(ApiError.UnauthorizedError());
        }
        const userFromDb = await UserService.getUser(validateUserData.email);
        if (!userFromDb) {
            return next(ApiError.UnauthorizedError());
        }
        req.headers["userId"] = userFromDb.id.toString();
        next();
    } catch (err) {
        next(err);
    }
}
