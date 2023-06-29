import express from "express";
import {
	streamerIdSchema,
	streamersController,
	voteTypeSchema,
} from "./streamers.controller";
import { StreamerSchema } from "../../prisma/generated/zod";
import { validateBody, validateParams } from "../middleware/validate";

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
	validateBody(StreamerSchema),
	streamersController.upload
);

streamersRouter.put(
	`${BASE_URL}/:streamerId/vote`,
	validateParams(streamerIdSchema),
	validateBody(voteTypeSchema),
	streamersController.vote
);

export { streamersRouter };
