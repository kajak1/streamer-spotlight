import express from "express";
import {
	streamerIdSchema,
	streamersController,
	voteTypeSchema,
} from "./streamers.controller";
import { validateBody, validateParams } from "../middleware/validate";
import { StreamerFormData } from "../schemas";

const streamersRouter = express.Router();

const BASE_URL = "/streamers";

streamersRouter.get(`${BASE_URL}`, streamersController.getAll);

streamersRouter.get(
	`${BASE_URL}/:streamerId`,
	validateParams(streamerIdSchema),
	streamersController.getSpecific
);

streamersRouter.post(
	`${BASE_URL}`,
	validateBody(StreamerFormData),
	streamersController.upload
);

streamersRouter.put(
	`${BASE_URL}/:streamerId/vote`,
	validateParams(streamerIdSchema),
	validateBody(voteTypeSchema),
	streamersController.vote
);

export { streamersRouter };
