import { createServer } from "./createServer";
import { env } from "./env";
import { logger } from "./logger";
import { createWebsocketServer } from "./websocket.config";

const PORT = env.PORT || 0;
const HOST = "0.0.0.0";

const app = createServer();

const httpServer = app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

createWebsocketServer(httpServer);

import { createClient } from "redis";

const client = createClient({
	url: "redis://redis:6379",
});

logger.info(`redis.isReady ${client.isReady}`);

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();
