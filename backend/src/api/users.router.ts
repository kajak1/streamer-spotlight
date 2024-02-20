import { Router } from "express";
import { catchAsync } from "../middleware/errorHandler";
import { UsersController } from "../controllers/users.controller.";
import { protect } from "../middleware/protect";
import { container } from "tsyringe";

export function usersRouting(): Router {
	const usersRouter = Router();

	const usersController = container.resolve(UsersController);

	const BASE_URL = "/users";

	usersRouter.get(`${BASE_URL}/error`, catchAsync(usersController.throwError));
	usersRouter.get(`${BASE_URL}/me`, protect, catchAsync(usersController.getData));
	usersRouter.get(`${BASE_URL}/votes`, protect, catchAsync(usersController.getAllVotes));
	usersRouter.get(`${BASE_URL}/votes/:streamerId`, protect, catchAsync(usersController.getVotesOnStreamer));

	return usersRouter;
}
