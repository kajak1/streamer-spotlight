import http from "http";
import { Server } from "socket.io";
import { logger } from "./logger";
import { socketLoggerIncoming, socketLoggerOutcoming } from "./middleware/requestLogger";
import { createStreamersSocketRepository } from "./repositories/streamers.socket.repository";

export const EVENTS = {
	CONNECTION: "connection",
	DISCONNECT: "disconnect",
	STREAMER_ADDED: "STREAMER_ADDED",
	VOTE: "VOTE",
} as const;

export function createWebsocketServer(httpServer: http.Server) {
	const io = new Server(httpServer, {
		cors: {
			origin: ["http://localhost:3000", "http://192.168.50.235:3000", "http://172.19.0.2:3000", "172.23.0.2:3000"],
			methods: ["GET", "POST"],
		},
	});

	io.on(EVENTS.CONNECTION, (socket) => {
		logger.info(`Connected: ${socket.id}`);
		const streamersSocketRepository = createStreamersSocketRepository(io);

		socket.onAny(socketLoggerIncoming);
		socket.onAnyOutgoing(socketLoggerOutcoming);

		socket.on(EVENTS.STREAMER_ADDED, streamersSocketRepository.handleAddedStreamer);

		socket.on(EVENTS.VOTE, streamersSocketRepository.handleVote);

		socket.on(EVENTS.DISCONNECT, () => logger.info(`Disconnected: ${socket.id}`));
	});

	return io;
}
