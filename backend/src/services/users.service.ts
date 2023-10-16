import { ApplicationError } from "../errors/ApplicationError";
import { getRedisClient } from "../redis";
import { UsersRepository, usersRepository } from "../repositories/users.repostitory";

export class UsersService {
	constructor(private usersRepository: UsersRepository) {}

	isUsernameAvailable = async (args: Parameters<UsersRepository["find"]>[0]) => {
		try {
			const user = await this.usersRepository.find(args);

			const isAvailable = user === null;

			return isAvailable;
		} catch (e) {
			return false;
		}
	};

	getUserIdFromSession = async ({ sessionId }: Record<string, string>): Promise<string> => {
		const userId = await getRedisClient().get(`session:${sessionId}`);
		if (!userId) throw new ApplicationError("UNAUTHORIZED");

		return userId;
	};

	getVotesOnStreamer = async (userId: string, streamerId: string) => {
		const castedVotesRaw = await this.usersRepository.getVotes(userId);
		if (!castedVotesRaw) throw new ApplicationError("UNKNOWN_ERROR");

		const didDownvote = castedVotesRaw.Downvote.map(({ streamerId }) => streamerId).reduce((prev, curr) => {
			if (prev === true) return prev;
			return curr === streamerId;
		}, false);

		const didUpvote = castedVotesRaw.Upvote.map(({ streamerId }) => streamerId).reduce((prev, curr) => {
			if (prev === true) return prev;
			return curr === streamerId;
		}, false);

		return {
			didUpvote,
			didDownvote,
		};
	};
}

export const usersService = new UsersService(usersRepository);
