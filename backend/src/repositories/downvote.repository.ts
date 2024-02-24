import { Downvote, Prisma } from "@prisma/client";
import { HttpError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";
import { VoteRepository } from "./vote.repository.types";

export class DownvoteRepository implements VoteRepository {
	constructor() {}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().downvote.findMany();

			return allUsers;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR");
			}
		}
	};

	findUnique = async (params: Prisma.DownvoteFindUniqueArgs) => {
		try {
			const foundUser = await getPrismaClient().downvote.findUnique(params);

			return foundUser;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR");
			}
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
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR");
			}
		}
	};

	delete = async (params: Prisma.DownvoteWhereUniqueInput) => {
		try {
			const deletedVote = await getPrismaClient().downvote.delete({
				where: params,
			});

			return deletedVote.id;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR");
			}
		}
	};
}
