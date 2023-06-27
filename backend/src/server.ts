import cors from "cors";
import express from "express";
import { streamersRouter } from "./streamers/streamers.router";

export function createServer() {
	const app = express();

	app.use(cors({ origin: "http://localhost:3000" }));

	app.use(streamersRouter);

	return app;
}
