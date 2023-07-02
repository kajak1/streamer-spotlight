import express from "express";
import { streamersController } from "./streamers.controller";
import { validateBody, validateParams } from "../middleware/validate";
import {
	StreamerFormSchema,
	streamerIdSchema,
	voteTypeSchema,
} from "../shared.types";

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
	validateBody(StreamerFormSchema),
	streamersController.upload
);

streamersRouter.put(
	`${BASE_URL}/:streamerId/vote`,
	validateParams(streamerIdSchema),
	validateBody(voteTypeSchema),
	streamersController.vote
);

export { streamersRouter };
