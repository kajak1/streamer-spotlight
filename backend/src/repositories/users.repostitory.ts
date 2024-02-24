import { Prisma, User } from "@prisma/client";
import { HttpError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";
import { injectable } from "tsyringe";

@injectable()
export class UsersRepository {
	constructor() {}

	findAll = async () => {
		try {
			const usersRaw = await getPrismaClient().user.findMany({});

			const users = usersRaw.map((user): Pick<User, "id" | "username"> => {
				return {
					id: user.id,
					username: user.username,
				};
			});

			return users;
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

	find = async (args: Prisma.UserFindUniqueArgs["where"]) => {
		try {
			const foundUser = await getPrismaClient().user.findUnique({
				where: args,
				select: {
					username: true,
					id: true,
				},
			});

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

	findAddedStreamers = async (where: Prisma.UserFindUniqueArgs["where"]) => {
		return await getPrismaClient().user.findUnique({
			where: where,
			select: {
				Streamer: true,
			},
		});
	};

	getVotes = async (id: User["id"]) => {
		try {
			const castedVotesRaw = await getPrismaClient().user.findUnique({
				where: {
					id: id,
				},
				include: {
					Downvote: {
						select: {
							streamerId: true,
						},
					},
					Upvote: {
						select: {
							streamerId: true,
						},
					},
				},
			});

			return castedVotesRaw;
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

	insert = async ({ username, password }: Pick<User, "username" | "password">) => {
		try {
			const createdUser = await getPrismaClient().user.create({
				data: {
					username: username,
					password: password,
				},
			});

			return createdUser;
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
