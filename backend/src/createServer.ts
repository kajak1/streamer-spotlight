import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { streamersRouter } from "./api/streamers.router";
import { errorHandler } from "./middleware/errorHandler";
import { errorLogger } from "./middleware/errorLogger";
import { requestLogger } from "./middleware/requestLogger";
import { usersRouter } from "./api/users.router";
import cookieParser from "cookie-parser";
import { authRouter } from "./api/auth.router";

export function createServer() {
	const app = express();

	app.use(cors());
	app.use(cookieParser());

	app.use(bodyParser.json());
	app.use(requestLogger);

	app.use(authRouter);
	app.use(usersRouter);
	app.use(streamersRouter);

	app.use(errorLogger);
	app.use(errorHandler);

	return app;
}
