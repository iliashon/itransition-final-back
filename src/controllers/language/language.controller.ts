import { Request, Response, NextFunction } from "express";
import LanguageService from "../../services/language/language.service";

class LanguageController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const langList = await LanguageService.getAll();
            res.json(langList);
        } catch (err) {
            next(err);
        }
    }
}

export default new LanguageController();
