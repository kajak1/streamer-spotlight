import { injectable } from "tsyringe";
import { HttpError } from "../errors/ApplicationError";
import { getRedisClient } from "../redis";
import { UsersRepository } from "../repositories/users.repostitory";

@injectable()
export class UsersService {
	constructor(private usersRepository: UsersRepository) {}

	isUsernameAvailable = async (args: Parameters<UsersRepository["find"]>[0]["where"]) => {
		try {
			const user = await this.usersRepository.find({ where: args });

			const isAvailable = user === null;

			return isAvailable;
		} catch (e) {
			return false;
		}
	};

	getUserIdFromSession = async ({ sessionId }: Record<string, string>): Promise<string> => {
		const redis = await getRedisClient();
		const userId = await redis.get(`session:${sessionId}`);
		if (!userId) throw new HttpError("UNAUTHORIZED");

		return userId;
	};

	getVotesOnStreamer = async (userId: string, streamerId: string) => {
		const castedVotesRaw = await this.usersRepository.getVotes(userId);
		if (!castedVotesRaw) throw new HttpError("UNKNOWN_ERROR");

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
