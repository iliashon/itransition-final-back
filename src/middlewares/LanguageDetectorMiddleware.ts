import { NextFunction, Request, Response } from "express";
import i18next from "i18next";

export default async function LanguageDetectorMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    await i18next.changeLanguage(req.headers["accept-language"] || "en");
    next();
}
