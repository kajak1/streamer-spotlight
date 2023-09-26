import express, { Request, Response } from "express";
import { handleAsyncErrors } from "../middleware/errorHandler";
import { authController } from "../controllers/auth.controller";
import { protect } from "../middleware/protect";

const authRouter = express.Router();

const BASE_URL = "/auth";

authRouter.post(`${BASE_URL}/login`, handleAsyncErrors(authController.login));
authRouter.get(`${BASE_URL}/test`, protect, (req: Request, res: Response) => {
	res.json("hello in auth/test");
});

export { authRouter };
