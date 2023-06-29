import { Prisma, Streamer } from "@prisma/client";
import { prisma } from "../prisma";
import "express-async-errors";

class StreamersRepository {
	constructor() {
		// placeholder
	}

	async findAll() {
		const allUsers = await prisma.streamer.findMany();

		return allUsers;
	}

	async findOne(criteria: Prisma.StreamerWhereUniqueInput) {
		const allUsers = await prisma.streamer.findUnique({
			where: criteria,
		});

		return allUsers;
	}

	async insert(streamerToUpload: Streamer) {
		return await prisma.streamer.create({
			data: streamerToUpload,
		});
	}

	private updateVoteCount(
		current: Pick<Streamer, "downvotes" | "upvotes">,
		voteType: "upvote" | "downvote"
	): Pick<Streamer, "downvotes" | "upvotes"> {
		const currentCopy = { ...current };

		if (voteType === "upvote") {
			currentCopy.upvotes += 1;
		}

		if (voteType === "downvote") {
			currentCopy.downvotes += 1;
		}

		return currentCopy;
	}

	async vote(streamerId: Streamer["id"], voteType: "upvote" | "downvote") {
		const streamerToModify = await this.findOne({ id: streamerId });

		if (!streamerToModify) {
			return undefined;
		}

		const newVoteCount = this.updateVoteCount(
			{
				downvotes: streamerToModify.downvotes,
				upvotes: streamerToModify.upvotes,
			},
			voteType
		);

		await prisma.streamer.update({
			where: {
				id: streamerId,
			},
			data: newVoteCount,
		});
	}
}

export const streamersRepository = new StreamersRepository();
