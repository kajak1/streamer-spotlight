import http from "http";
import { Server } from "socket.io";

export const EVENTS = {
	CONNECTION: "connection",
	DISCONNECT: "disconnect",
	STREAMER_ADDED: "STREAMER_ADDED",
	VOTE: "VOTE",
} as const;

export function createSocketServer(httpServer: http.Server) {
	const io = new Server(httpServer, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	return io;
}
