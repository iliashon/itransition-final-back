import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello this is api server");
});

app.listen(PORT, () => {
    console.log(`Start server on port ${PORT}`);
});
