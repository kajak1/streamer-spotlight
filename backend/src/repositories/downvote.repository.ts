import { Downvote, Prisma } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";
import { VoteRepository } from "./upvotes.repository";

class DownvoteRepository implements VoteRepository<Downvote> {
	constructor() {}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().downvote.findMany();

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", {
				baseError: e,
			});
		}
	};

	findUnique = async (params: Prisma.DownvoteFindUniqueArgs) => {
		try {
			const foundUser = await getPrismaClient().downvote.findUnique(params);

			return foundUser;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", {
				baseError: e,
			});
		}
	};

	insert = async ({ streamerId, userId }: Pick<Downvote, "streamerId" | "userId">) => {
		try {
			const createdStreamer = await getPrismaClient().downvote.create({
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

	delete = async (params: Prisma.DownvoteWhereUniqueInput) => {
		try {
			const deletedVote = await getPrismaClient().downvote.delete({
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

export const downvoteRepository = new DownvoteRepository();
