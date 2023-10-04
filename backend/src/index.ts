import { env } from "./env";
import { createHttpServer } from "./httpServer";
import { initRedisClient } from "./redis";
import { createWebsocketServer } from "./websocketServer";

const PORT = env.PORT || 0;
const HOST = "0.0.0.0";

const app = createHttpServer();

const httpServer = app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

createWebsocketServer(httpServer);
initRedisClient()
