import express from "express";
import cors from "cors";
import { streamersRouter } from "./streamers/streamers.router";

const PORT = 3001;
const HOST = "0.0.0.0";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", streamersRouter);

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
