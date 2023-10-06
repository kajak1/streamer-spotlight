import express from "express";
import { streamersController } from "../controllers/streamers.controller";
import { handleAsyncErrors } from "../middleware/errorHandler";
import { validateBody, validateParams } from "../middleware/validate";
import { GetSpecificParamsSchema, UploadBodySchema, VoteParamsSchema, voteTypeSchema } from "../shared.types";
import { protect } from "../middleware/protect";

const streamersRouter = express.Router();

const BASE_URL = "/streamers";

streamersRouter.get(`${BASE_URL}`, handleAsyncErrors(streamersController.getAll));

streamersRouter.get(
	`${BASE_URL}/:streamerId`,
	protect,
	validateParams(GetSpecificParamsSchema),
	handleAsyncErrors(streamersController.getSpecific)
);

streamersRouter.post(`${BASE_URL}`, protect, validateBody(UploadBodySchema), handleAsyncErrors(streamersController.upload));

streamersRouter.put(
	`${BASE_URL}/:streamerId/vote`,
	protect,
	validateParams(VoteParamsSchema),
	validateBody(voteTypeSchema),
	handleAsyncErrors(streamersController.vote)
);

streamersRouter.get(
	`${BASE_URL}/:streamerId/vote`,
	protect,
	validateParams(VoteParamsSchema),
	handleAsyncErrors(streamersController.getVoteCount)
);

export { streamersRouter };
