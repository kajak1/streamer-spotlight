import { User } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { getPrismaClient } from "../prismaClient";

class UsersRepository {
	constructor() {
		// empty
	}

	isUsernameAvailable = async (username: User["username"]) => {
		try {
			const user = await this.find(username);

			const isAvailable = user === null;
	
			return isAvailable;
		} catch (e) {
			// asd
			return true
		}

	};

	find = async (username: User["username"]) => {
		try {
			const foundUser = await getPrismaClient().user.findUnique({
				where: {
					username: username,
				},
			});

			return foundUser;
		} catch (e) {
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};

	getVotes = async (username: User["username"]) => {
		try {
			const castedVotesRaw = await getPrismaClient().user.findUnique({
				where: {
					username: username,
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
			throw new ApplicationError("UNKNOWN_ERROR", e);
		}
	};
}

export const usersRepository = new UsersRepository();
