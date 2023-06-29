import cors from "cors";
import express from "express";
import { streamersRouter } from "./streamers/streamers.router";
import { errorHandler } from "./middleware/errorHandler";
import bodyParser from "body-parser";
import { errorLogger } from "./middleware/errorLogger";

export function createServer() {
	const app = express();

	app.use(cors({ origin: "http://localhost:3000" }));

	app.use(bodyParser.json());

	app.use(streamersRouter);

	app.use(errorLogger);
	app.use(errorHandler);

	return app;
}
