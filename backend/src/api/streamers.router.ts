import express from "express";
import { GetByUserSchema, streamersController } from "../controllers/streamers.controller";
import { catchAsync } from "../middleware/errorHandler";
import { validateBody, validateParams } from "../middleware/validate";
import { GetSpecificParamsSchema, UploadBodySchema, VoteParamsSchema, voteTypeSchema } from "../shared.types";
import { protect } from "../middleware/protect";

const streamersRouter = express.Router();

const BASE_URL = "/streamers";

streamersRouter.get(`${BASE_URL}`, protect, catchAsync(streamersController.getAll));
streamersRouter.get(`${BASE_URL}/users/:userId`, protect, validateParams(GetByUserSchema), catchAsync(streamersController.getByUser));

streamersRouter.get(
	`${BASE_URL}/:streamerId`,
	protect,
	validateParams(GetSpecificParamsSchema),
	catchAsync(streamersController.getSpecific)
);

streamersRouter.post(`${BASE_URL}`, protect, validateBody(UploadBodySchema), catchAsync(streamersController.upload));

streamersRouter.put(
	`${BASE_URL}/:streamerId/vote`,
	protect,
	validateParams(VoteParamsSchema),
	validateBody(voteTypeSchema),
	catchAsync(streamersController.vote)
);

streamersRouter.get(
	`${BASE_URL}/:streamerId/vote`,
	protect,
	validateParams(VoteParamsSchema),
	catchAsync(streamersController.getVoteCount)
);

export { streamersRouter };
