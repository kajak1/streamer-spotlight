import http from "http";
import { Server } from "socket.io";
import { logger } from "./logger";
import { socketLoggerIncoming, socketLoggerOutcoming } from "./middleware/requestLogger";
import { createStreamersSocketRepository } from "./repositories/streamers.socket.repository";
import { EVENTS, serverOptions } from "./websocketServer.config";

export function createWebsocketServer(httpServer: http.Server) {
	const io = new Server(httpServer, serverOptions);
	const streamersSocketRepository = createStreamersSocketRepository(io);
	
	io.on(EVENTS.CONNECTION, (socket) => {
		logger.info(`Connected: ${socket.id}`);

		socket.onAny(socketLoggerIncoming);
		socket.onAnyOutgoing(socketLoggerOutcoming);

		socket.on(EVENTS.STREAMER_ADDED, streamersSocketRepository.handleAddedStreamer);

		socket.on(EVENTS.VOTE, streamersSocketRepository.handleVote);

		socket.on(EVENTS.DISCONNECT, () => logger.info(`Disconnected: ${socket.id}`));
	});

	return io;
}
