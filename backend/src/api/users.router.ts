import express from "express";
import { handleAsyncErrors } from "../middleware/errorHandler";
import { usersController } from "../controllers/users.controller.";
import { protect } from "../middleware/protect";

const usersRouter = express.Router();

const BASE_URL = "/users";

usersRouter.get(`${BASE_URL}/me`, protect, handleAsyncErrors(usersController.getData));
usersRouter.get(`${BASE_URL}/votes`, protect, handleAsyncErrors(usersController.getVotes));
usersRouter.get(`${BASE_URL}/votes/:streamerId`, protect, handleAsyncErrors(usersController.getVotesOnStreamer));

export { usersRouter };
