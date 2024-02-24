import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import { catchAsync } from "../middleware/errorHandler";
import { protect } from "../middleware/protect";

export function authRouting(): Router {
	const authRouter = Router();
	const authController = container.resolve(AuthController);

	const BASE_URL = "/auth";

	authRouter.post(`${BASE_URL}/register`, catchAsync(authController.register));
	authRouter.post(`${BASE_URL}/login`, catchAsync(authController.login));
	authRouter.post(`${BASE_URL}/logout`, protect, catchAsync(authController.logout));
	authRouter.get(`${BASE_URL}/test`, protect, (req: Request, res: Response) => {
		res.status(200).json("hello in auth/test");
	});

	return authRouter;
}
