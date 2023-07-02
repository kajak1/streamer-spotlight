import { io } from "socket.io-client";
import { SERVER_URL } from "./websocket.config";

export const socket = io(SERVER_URL, {
	autoConnect: false,
});