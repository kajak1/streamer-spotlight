import { injectable } from "tsyringe";
import { HttpError } from "../errors/ApplicationError";
import { createTransaction } from "../prismaClient";
import { DownvoteRepository } from "../repositories/downvote.repository";
import { UpvoteRepository } from "../repositories/upvotes.repository";
import { VoteTypeBody } from "../shared.types";

type VoteProps = {
	userId: string;
	streamerId: string;
} & VoteTypeBody;

@injectable()
export class VoteService {
	constructor(private upvoteRepository: UpvoteRepository, private downvoteRepository: DownvoteRepository) {}

	selectRepository<T extends VoteTypeBody["voteType"]>(
		voteType: T
	): T extends "upvote" ? UpvoteRepository : DownvoteRepository {
		switch (voteType) {
			case "upvote":
				return this.upvoteRepository;
			case "downvote":
				return this.downvoteRepository;
			default:
				throw new HttpError("UNKNOWN_ERROR");
		}
	}

	private castVote = async ({ streamerId, userId, voteType }: Omit<VoteProps, "operation">) => {
		const voteRepostiory = this.selectRepository(voteType);

		await voteRepostiory.insert({
			streamerId,
			userId,
		});
	};

	private removeVote = async ({ voteType, streamerId, userId }: Omit<VoteProps, "operation">) => {
		const voteRepostiory = this.selectRepository(voteType);

		await voteRepostiory.delete({
			userAndStreamerId: {
				streamerId,
				userId,
			},
		});
	};

	private removeOppositeVote = async ({ streamerId, userId, voteType }: Omit<VoteProps, "operation">) => {
		const oppositeType: VoteTypeBody["voteType"] = voteType === "upvote" ? "downvote" : "upvote";

		const oppositeVoteRepository = this.selectRepository(oppositeType);

		const oppositeVote = await oppositeVoteRepository.findUnique({
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
	};

	vote = async ({ userId, streamerId, voteType, operation }: VoteProps): Promise<boolean> => {
		switch (operation) {
			case "add": {
				await createTransaction(async () => {
					await Promise.all([
						this.removeOppositeVote({ voteType, streamerId, userId }),
						this.castVote({ voteType, streamerId, userId }),
					]);
				}).catch((e: unknown) => {
					if (e instanceof Error) {
						throw new HttpError("ALREADY_VOTED", {
							baseError: e,
						});
					} else {
						throw new HttpError("UNKNOWN_ERROR")
					}
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
