import { NextFunction, Request, Response } from "express";
import SearchService from "../../services/search/search.service";
import ApiError from "../../exceptions/ApiError";

class SearchController {
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { search } = req.query;

            const formattedSearch: string | undefined = search
                ?.toString()
                .replace(/[()|&:*!]/g, " ")
                .trim()
                .split(/\s+/)
                .join(" | ");

            const items = await SearchService.search(formattedSearch || "");

            res.json(items);
        } catch (err) {
            next(err);
        }
    }
}

export default new SearchController();
