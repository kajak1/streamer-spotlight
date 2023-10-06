import { ServerOptions } from "socket.io";

export const EVENTS = {
	CONNECTION: "connection",
	DISCONNECT: "disconnect",
	STREAMER_ADDED: "STREAMER_ADDED",
	VOTE: "VOTE",
} as const;

export const serverOptions: Partial<ServerOptions> = {
	cors: {
		origin: ["http://localhost:3000", "http://192.168.50.235:3000", "http://172.19.0.2:3000", "172.23.0.2:3000"],
		methods: ["GET", "POST"],
	},
};
