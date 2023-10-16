import express, { Request, Response } from "express";
import { catchAsync } from "../middleware/errorHandler";
import { authController } from "../controllers/auth.controller";
import { protect } from "../middleware/protect";

const authRouter = express.Router();

const BASE_URL = "/auth";

authRouter.post(`${BASE_URL}/register`, catchAsync(authController.register));
authRouter.post(`${BASE_URL}/login`, catchAsync(authController.login));
authRouter.post(`${BASE_URL}/logout`, protect, catchAsync(authController.logout));
authRouter.get(`${BASE_URL}/test`, protect, (req: Request, res: Response) => {
	res.status(200).json("hello in auth/test");
});

export { authRouter };