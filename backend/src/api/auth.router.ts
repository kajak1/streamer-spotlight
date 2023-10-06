import express, { Request, Response } from "express";
import { handleAsyncErrors } from "../middleware/errorHandler";
import { authController } from "../controllers/auth.controller";
import { protect } from "../middleware/protect";

const authRouter = express.Router();

const BASE_URL = "/auth";

// TODO refactor endpoint to correctly suit REST standard
authRouter.post(`${BASE_URL}/register`, handleAsyncErrors(authController.register));
authRouter.post(`${BASE_URL}/login`, handleAsyncErrors(authController.login));
authRouter.post(`${BASE_URL}/login`, protect, handleAsyncErrors(authController.logout));
authRouter.get(`${BASE_URL}/test`, protect, (req: Request, res: Response) => {
	res.status(200).json("hello in auth/test");
});

export { authRouter };
