import { createServer } from "./createServer";
import {
	socketLoggerIncoming,
	socketLoggerOutcoming,
} from "./middleware/requestLogger";
import { EVENTS, createWebsocketServer } from "./websocket.config";
import { logger } from "./logger";
import { env } from "./env";
import { createStreamersSocketRepository } from "./repositories/streamers.socket.repository";

const PORT = env.PORT || 0;
const HOST = "0.0.0.0";

const app = createServer();

const httpServer = app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

const io = createWebsocketServer(httpServer);

io.on(EVENTS.CONNECTION, (socket) => {
	logger.info(`Connected: ${socket.id}`);
	const streamersSocketRepository = createStreamersSocketRepository(io);

	socket.onAny(socketLoggerIncoming);
	socket.onAnyOutgoing(socketLoggerOutcoming);

	socket.on(
		EVENTS.STREAMER_ADDED,
		streamersSocketRepository.handleAddedStreamer
	);

	socket.on(EVENTS.VOTE, streamersSocketRepository.handleVote);

	socket.on(EVENTS.DISCONNECT, () => logger.info(`Disconnected: ${socket.id}`));
});
