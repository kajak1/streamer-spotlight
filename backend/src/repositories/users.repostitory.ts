import { Prisma, User } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";

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
			throw new ApplicationError("NOT_FOUND", { baseError: e });
		}
	};

	find = async (args: Prisma.UserFindUniqueArgs["where"]) => {
		try {
			const foundUser = await getPrismaClient().user.findUnique({
				where: args,
			});

			return foundUser;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", { baseError: e });
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
			throw new ApplicationError("UNKNOWN_ERROR", { baseError: e });
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
			throw new ApplicationError("UNKNOWN_ERROR", { baseError: e });
		}
	};
}

export const usersRepository = new UsersRepository();
