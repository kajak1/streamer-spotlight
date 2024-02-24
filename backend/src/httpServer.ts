import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { streamersRouting } from "./api/streamers.router";
import { errorHandler } from "./middleware/errorHandler";
import { errorLogger } from "./middleware/errorLogger";
import { requestLogger } from "./middleware/requestLogger";
import { usersRouting } from "./api/users.router";
import cookieParser from "cookie-parser";
import { authRouting } from "./api/auth.router";
import { env } from "./env";

export function createExpressApp() {
	const app = express();

	app.use(cors({ origin: "http://localhost:3000", credentials: true }));
	app.use(cookieParser(env.COOKIE_SECRET));

	app.use(json());
	app.use(requestLogger);

	app.use(authRouting());
	app.use(usersRouting());
	app.use(streamersRouting());

	app.use(errorLogger);
	app.use(errorHandler);

	return app;
}
