import { createServer } from "./createServer";
import {
	socketLoggerIncoming,
	socketLoggerOutcoming,
} from "./middleware/requestLogger";
import { EVENTS, createSocketServer } from "./websocket.config";
import { createStreamersSocketRepository } from "./streamers/streamers.socket.repository";
import { logger } from "../logger";

const PORT = 3001;
const HOST = "0.0.0.0";

const app = createServer();

const httpServer = app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

const io = createSocketServer(httpServer);

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
