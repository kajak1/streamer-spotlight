import { Prisma, Streamer } from "@prisma/client";
import "express-async-errors";
import { ApplicationError } from "../errors/ApplicationError";
import { prisma } from "../prismaClient";
import { StreamerForm } from "../shared.types";

class StreamersRepository {
	constructor() {
		// empty
	}

	async findAll() {
		try {
			const allUsers = await prisma.streamer.findMany();

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
		}
	}

	async findOne(criteria: Prisma.StreamerWhereUniqueInput) {
		try {
			const allUsers = await prisma.streamer.findUnique({
				where: criteria,
			});

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
		}
	}

	async insert(streamerToUpload: StreamerForm) {
		try {
			const createdStreamer = await prisma.streamer.create({
				data: {
					name: streamerToUpload.name,
					platform: streamerToUpload.platform,
					description: streamerToUpload.description,
				},
			});

			return createdStreamer;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	}

	private getNextVoteCount(
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
			throw new ApplicationError("NOT_FOUND");
		}

		const newVoteCount = this.getNextVoteCount(
			{
				downvotes: streamerToModify.downvotes,
				upvotes: streamerToModify.upvotes,
			},
			voteType
		);

		try {
			const updatedStreamer = await prisma.streamer.update({
				where: {
					id: streamerId,
				},
				data: newVoteCount,
			});

			return updatedStreamer;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	}
}

export const streamersRepository = new StreamersRepository();
