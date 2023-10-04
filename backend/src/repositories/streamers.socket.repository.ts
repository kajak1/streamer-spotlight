import { Server } from "socket.io";
import { EVENTS } from "../websocketServer.config";
import { streamersRepository } from "./streamers.repository";
import { getPrismaClient } from "../prismaClient";

export class StreamersSocketRepository {
	constructor(private io: Server) {
		this.io = io;
	}

	handleAddedStreamer = async (id: string) => {
		const createdStreamer = await streamersRepository.findUnique({
			where: {
				id: id,
			},
		});

		this.io.emit(EVENTS.STREAMER_ADDED, createdStreamer);
	};

	handleVote = async (streamerId: string) => {
		const streamer = await getPrismaClient().streamer.findUnique({
			where: {
				id: streamerId,
			},
			select: {
				id: true,
				_count: {
					select: {
						Downvote: true,
						Upvote: true,
					},
				},
			},
		});

		if (!streamer) {
			console.log("no streamer");
			return;
		}

		this.io.emit(EVENTS.VOTE, {
			id: streamer.id,
			upvotes: streamer._count.Upvote,
			downvotes: streamer._count.Downvote,
		});
	};
}

export function createStreamersSocketRepository(io: Server) {
	return new StreamersSocketRepository(io);
}
