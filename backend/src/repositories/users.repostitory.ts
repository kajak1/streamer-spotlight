import { User } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";

class UsersRepository {
	constructor() {
		// empty
	}

	find = async (id: User["id"]) => {
		try {
			const foundUser = await getPrismaClient().user.findUnique({
				where: {
					id: id,
				},
			});

			return foundUser;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
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
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};

	insert = async (id: User["id"]) => {
		try {
			const createdUser = await getPrismaClient().user.create({
				data: {
					id: id,
				},
			});

			return createdUser;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};
}

export const usersRepository = new UsersRepository();
