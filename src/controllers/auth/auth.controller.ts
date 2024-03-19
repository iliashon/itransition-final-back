import AuthService from "../../services/auth/auth.service";
import TRegisterData from "../../types/authTypes/TRegisterData";
import { Request, Response, NextFunction } from "express";
import TLoginData from "../../types/authTypes/TLoginData";
import TUserAuthData from "../../types/authTypes/TUserAuthData";

const MAX_AGE_COOKIE = 30 * 24 * 60 * 60 * 1000;

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user: TUserAuthData = await AuthService.login(
                req.body as TLoginData,
            );
            res.cookie("refreshToken", user.refreshToken, {
                maxAge: MAX_AGE_COOKIE,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.json(token);
        } catch (err) {
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser: TUserAuthData = await AuthService.register(
                req.body as TRegisterData,
            );
            res.cookie("refreshToken", newUser.refreshToken, {
                maxAge: MAX_AGE_COOKIE,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            res.json(newUser);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const user: TUserAuthData = await AuthService.refresh(refreshToken);
            res.cookie("refreshToken", user.refreshToken, {
                maxAge: MAX_AGE_COOKIE,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            res.json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
