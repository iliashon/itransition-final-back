import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }),
);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello this is api server");
});

app.listen(PORT, () => {
    console.log(`Start server on port ${PORT}`);
});

export default app;
