import http from "http";
import "reflect-metadata";
import { container } from "tsyringe";
import { Logger } from "winston";
import { registerDependencies } from "./container";
import { env } from "./env";
import { initRedisClient } from "./redis";

const PORT = env.PORT || 0;
const HOST = "0.0.0.0";

registerDependencies();

const logger = container.resolve<Logger>("Logger");
const httpServer = container.resolve<http.Server>("HttpServer");

httpServer.listen(PORT, HOST, () => {
	logger.info(`Running on http://${HOST}:${PORT}`);
});

initRedisClient();

process.on("SIGTERM", () => {
	logger.info(`Closing server on http://${HOST}:${PORT}`);
	httpServer.close();
})
