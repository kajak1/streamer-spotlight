import { ApplicationError } from "../errors/ApplicationError";
import { createTransaction } from "../prismaClient";
import { downvoteRepository } from "../repositories/downvote.repository";
import { upvoteRepository } from "../repositories/upvotes.repository";
import { usersRepository } from "../repositories/users.repostitory";
import { VoteTypeBody } from "../shared.types";

type VoteProps = {
	userId: string;
	streamerId: string;
} & VoteTypeBody;

class StreamersService {
	constructor() {
		// asd
	}

	private removeOppositeVote = async ({ streamerId, userId, voteType }: Omit<VoteProps, "operation">) => {
		const oppositeType: VoteTypeBody["voteType"] = voteType === "upvote" ? "downvote" : "upvote";

		switch (oppositeType) {
			case "upvote": {
				const oppositeVote = await upvoteRepository.findUnique({
					where: {
						userAndStreamerId: {
							streamerId,
							userId,
						},
					},
				});

				if (oppositeVote) {
					await this.removeVote({ voteType: oppositeType, streamerId, userId });
				}

				return;
			}
			case "downvote": {
				const oppositeVote = await downvoteRepository.findUnique({
					where: {
						userAndStreamerId: {
							streamerId,
							userId,
						},
					},
				});

				if (oppositeVote) {
					await this.removeVote({ voteType: oppositeType, streamerId, userId });
				}

				return;
			}

			default: {
				throw new ApplicationError("UNKNOWN_ERROR");
			}
		}
	};

	private castVote = async ({ streamerId, userId, voteType }: Omit<VoteProps, "operation">) => {
		switch (voteType) {
			case "upvote": {
				await upvoteRepository.insert({
					streamerId,
					userId,
				});

				return;
			}

			case "downvote": {
				await downvoteRepository.insert({
					streamerId,
					userId,
				});

				return;
			}
		}
	};

	private removeVote = async ({ voteType, streamerId, userId }: Omit<VoteProps, "operation">) => {
		switch (voteType) {
			case "upvote": {
				await upvoteRepository.delete({
					userAndStreamerId: {
						streamerId,
						userId,
					},
				});

				break;
			}

			case "downvote": {
				await downvoteRepository.delete({
					userAndStreamerId: {
						streamerId,
						userId,
					},
				});

				break;
			}
		}
	};

	vote = async ({ userId, streamerId, voteType, operation }: VoteProps): Promise<boolean> => {
		const user = await usersRepository.find(userId);

		if (!user) {
			await usersRepository.insert(userId);
		}

		switch (operation) {
			case "add": {
				await createTransaction(async () => {
					await this.removeOppositeVote({ voteType, streamerId, userId });
					await this.castVote({ voteType, streamerId, userId });
				}).catch((e) => {
					throw new ApplicationError("ALREADY_VOTED", e);
				});

				return true;
			}

			case "remove": {
				await this.removeVote({ voteType, userId, streamerId });

				return true;
			}

			default: {
				return false;
			}
		}
	};
}

export const streamersService = new StreamersService();
