import http from "http";
import { Server } from "socket.io";
import { container, delay } from "tsyringe";
import { Logger } from "winston";
import { socketLoggerIncoming, socketLoggerOutcoming } from "./middleware/requestLogger";
import { StreamersSocketRepository } from "./repositories/streamers.socket.repository";
import { EVENTS, serverOptions } from "./websocketServer.config";

export function createWebsocketServer(httpServer: http.Server): Server {
	const io = new Server(httpServer, serverOptions);
	const logger = container.resolve<Logger>("Logger");

	const streamersSocketRepository = container.resolve(delay(() => StreamersSocketRepository));

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
