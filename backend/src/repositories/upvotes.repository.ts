import { Prisma, Upvote } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";
import { VoteRepository } from "./vote.repository.types";

class UpvoteRepository implements VoteRepository<Upvote> {
	constructor() {}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().upvote.findMany();

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", {
				baseError: e,
			});
		}
	};

	findUnique = async (args: Prisma.UpvoteFindUniqueArgs) => {
		try {
			const foundUser = await getPrismaClient().upvote.findUnique(args);

			return foundUser;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", {
				baseError: e,
			});
		}
	};

	insert = async ({ streamerId, userId }: Pick<Upvote, "streamerId" | "userId">) => {
		try {
			const createdStreamer = await getPrismaClient().upvote.create({
				data: {
					streamerId,
					userId,
				},
			});

			return createdStreamer;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", {
				baseError: e,
			});
		}
	};

	delete = async (params: Prisma.UpvoteWhereUniqueInput) => {
		try {
			const deletedVote = await getPrismaClient().upvote.delete({
				where: params,
			});

			return deletedVote.id;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", {
				baseError: e,
			});
		}
	};
}

export const upvoteRepository = new UpvoteRepository();
