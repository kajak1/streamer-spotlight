import { Socket, io } from "socket.io-client";
import { Streamer } from "./shared.types";
import { SERVER_URL } from "./websocket.config";

type UpdatedStreamer = Pick<Streamer, "id"> & {
	downvotes: number;
	upvotes: number;
};

export interface ServerToClientEvents {
	VOTE: (updated: UpdatedStreamer) => void;
	STREAMER_ADDED: (newStreamer: Streamer) => void;
}

export interface ClientToServerEvents {
	VOTE: (id: Streamer["id"]) => void;
	STREAMER_ADDED: (id: Streamer["id"]) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL, {
	autoConnect: false,
});
