import { NextFunction, Request, Response } from "express";
import UserService from "../../services/user/user.service";

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAll();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updateUsers = await UserService.update(req.body);
            res.json(updateUsers);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteUsers = await UserService.delete(req.body);
            res.json(deleteUsers);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
