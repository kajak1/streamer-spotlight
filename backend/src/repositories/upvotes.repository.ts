import { Prisma, Upvote } from "@prisma/client";
import { HttpError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";
import { VoteRepository } from "./vote.repository.types";

export class UpvoteRepository implements VoteRepository {
	constructor() {}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().upvote.findMany();

			return allUsers;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR")
			}
		}
	};

	findUnique = async (args: Prisma.UpvoteFindUniqueArgs) => {
		try {
			const foundUser = await getPrismaClient().upvote.findUnique(args);

			return foundUser;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR")
			}
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
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR")
			}
		}
	};

	delete = async (params: Prisma.UpvoteWhereUniqueInput) => {
		try {
			const deletedVote = await getPrismaClient().upvote.delete({
				where: params,
			});

			return deletedVote.id;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR")
			}
		}
	};
}