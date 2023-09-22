import { Downvote, Prisma } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";
import { logger } from "../logger";

class DownvoteRepository {
	constructor() {
		// empty
	}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().downvote.findMany();

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
		}
	};

	findUnique = async (params: Prisma.DownvoteFindUniqueArgs) => {
		try {
			const foundUser = await getPrismaClient().downvote.findUnique(params);
			// const foundUser = await prisma.downvote.findUnique(params);

			return foundUser;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
		}
	};

	insert = async ({ streamerId, userId }: Pick<Downvote, "streamerId" | "userId">) => {
		try {
			// const createdStreamer = await prisma.downvote.create({
			logger.warn(`downvote.repository.insert()`);
			logger.warn(`streamerId: ${streamerId}`);
			logger.warn(`userId: ${userId}`);
			const createdStreamer = await getPrismaClient().downvote.create({
				data: {
					streamerId,
					userId,
				},
			});

			return createdStreamer;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};

	delete = async (params: Prisma.DownvoteWhereUniqueInput) => {
		try {
			// const deletedVote = await prisma.downvote.delete({
			const deletedVote = await getPrismaClient().downvote.delete({
				where: params,
			});

			return deletedVote.id;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};
}

export const downvoteRepository = new DownvoteRepository();
