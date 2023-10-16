import express from "express";
import { catchAsync } from "../middleware/errorHandler";
import { usersController } from "../controllers/users.controller.";
import { protect } from "../middleware/protect";

const usersRouter = express.Router();

const BASE_URL = "/users";

usersRouter.get(`${BASE_URL}/me`, protect, catchAsync(usersController.getData));
usersRouter.get(`${BASE_URL}/votes`, protect, catchAsync(usersController.getAllVotes));
usersRouter.get(`${BASE_URL}/votes/:streamerId`, protect, catchAsync(usersController.getVotesOnStreamer));

export { usersRouter };
