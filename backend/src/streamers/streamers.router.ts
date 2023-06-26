import express from "express";
import { streamersController } from "./streamers.controller";

const streamersRouter = express.Router();

const BASE_URL = "/streamers";

streamersRouter.get(`${BASE_URL}`, streamersController.getAll);
streamersRouter.get(`${BASE_URL}/:streamerId`, streamersController.getSpecific);
streamersRouter.post(`${BASE_URL}`, streamersController.upload);
streamersRouter.put(`${BASE_URL}/:streamerId/vote`, streamersController.vote);

export { streamersRouter };
