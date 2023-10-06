import { Prisma, Upvote } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";

class UpvoteRepository {
	constructor() {
		// empty
	}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().upvote.findMany();

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
		}
	};

	findUnique = async (params: Prisma.UpvoteFindUniqueArgs) => {
		try {
			const foundUser = await getPrismaClient().upvote.findUnique(params);
			// const foundUser = await prisma.upvote.findUnique(params);

			return foundUser;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
		}
	};

	insert = async ({ streamerId, userId }: Pick<Upvote, "streamerId" | "userId">) => {
		try {
			// const createdStreamer = await prisma.upvote.create({
			const createdStreamer = await getPrismaClient().upvote.create({
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

	delete = async (params: Prisma.UpvoteWhereUniqueInput) => {
		try {
			// const deletedVote = await prisma.upvote.delete({
			const deletedVote = await getPrismaClient().upvote.delete({
				where: params,
			});

			return deletedVote.id;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};
}

export const upvoteRepository = new UpvoteRepository();
