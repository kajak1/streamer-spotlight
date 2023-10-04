import express from "express";
import { handleAsyncErrors } from "../middleware/errorHandler";
import { usersController } from "../controllers/users.controller.";

const usersRouter = express.Router();

const BASE_URL = "/users";

usersRouter.get(`${BASE_URL}/me`, handleAsyncErrors(usersController.getData));
usersRouter.get(`${BASE_URL}/votes`, handleAsyncErrors(usersController.getVotes));
usersRouter.get(`${BASE_URL}/votes/:streamerId`, handleAsyncErrors(usersController.getVotesOnStreamer));

export { usersRouter };
