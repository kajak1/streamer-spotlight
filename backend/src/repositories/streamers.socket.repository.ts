import { Server } from "socket.io";
import { inject, injectable } from "tsyringe";
import { getPrismaClient } from "../prismaClient";
import { EVENTS } from "../websocketServer.config";
import { StreamersRepository } from "./streamers.repository";

@injectable()
export class StreamersSocketRepository {
	constructor(@inject("WebsocketServer") private io: Server, private streamersRepository: StreamersRepository) {}

	handleAddedStreamer = async (id: string) => {
		const createdStreamer = await this.streamersRepository.findUnique({
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


