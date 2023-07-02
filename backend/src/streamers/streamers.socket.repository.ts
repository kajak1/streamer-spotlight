import { Server } from "socket.io";
import { EVENTS } from "../websocket.config";
import { streamersRepository } from "./streamers.repository";

export class StreamersSocketRepository {
	constructor(private io: Server) {
		this.io = io;
	}

	handleAddedStreamer = async (id: string) => {
		const createdStreamer = await streamersRepository.findOne({
			id: id,
		});

		this.io.emit(EVENTS.STREAMER_ADDED, createdStreamer);
	};

	handleVote = async (id: string) => {
		const updatedStreamer = await streamersRepository.findOne({ id: id });

		if (!updatedStreamer) {
			console.log("no streamer");
			return;
		}

		this.io.emit(EVENTS.VOTE, {
			id: updatedStreamer.id,
			upvotes: updatedStreamer.upvotes,
			downvotes: updatedStreamer.downvotes,
		});
	};
}

export function createStreamersSocketRepository(io: Server) {
	return new StreamersSocketRepository(io);
}
