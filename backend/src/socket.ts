import { Server } from "socket.io";
import http from "http";

export const SOCKET_EVENTS = {
	CONNECTION: "connection",
	DISCONNECT: "disconnect",
	STREAMER_ADDED: "streamer added",
	VOTE: "vote",
} as const;

export function createSocketServer(server: http.Server) {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
		console.log("a user connected");

		socket.on(SOCKET_EVENTS.DISCONNECT, () => {
			console.log("user disconncted");
			io.emit("user disconnected");
		});
	});

	return io;
}
