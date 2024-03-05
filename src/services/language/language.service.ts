import { PrismaClient } from "@prisma/client";
import TLanguage from "../../types/langTypes/TLanguage";

const db = new PrismaClient();

class LanguageService {
    getAll(): Promise<TLanguage[]> {
        return db.language.findMany();
    }
}

export default new LanguageService();
