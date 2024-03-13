import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import LogErrorMiddleware from "./middlewares/LogErrorMiddleware";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";

dotenv.config();

const PORT = process.env.PORT || 4000;

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + "/resources/locales/{{lng}}/{{ns}}.json",
        },
        fallbackLng: "en",
        preload: ["en", "ru"],
    });

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }),
);
app.use(i18nextMiddleware.handle(i18next));

app.use(routes);
app.use(LogErrorMiddleware);

app.listen(PORT, () => {
    console.log(`Start server on port ${PORT}`);
});

export default app;
