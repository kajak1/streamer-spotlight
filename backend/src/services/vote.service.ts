import { Downvote, Upvote } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { createTransaction } from "../prismaClient";
import { downvoteRepository } from "../repositories/downvote.repository";
import { upvoteRepository } from "../repositories/upvotes.repository";
import { VoteTypeBody } from "../shared.types";
import { VoteRepository } from "../repositories/vote.repository.types";

type VoteProps = {
	userId: string;
	streamerId: string;
} & VoteTypeBody;

export class VoteService {
	constructor(private upvoteRepository: VoteRepository<Upvote>, private downvoteRepository: VoteRepository<Downvote>) {}

	selectRepository<T extends VoteTypeBody["voteType"]>(
		voteType: T
	): T extends "upvote" ? VoteRepository<Upvote> : VoteRepository<Downvote> {
		switch (voteType) {
			case "upvote":
				return this.upvoteRepository;
			case "downvote":
				return this.downvoteRepository;
			default:
				throw new ApplicationError("UNKNOWN_ERROR");
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
					throw new ApplicationError("ALREADY_VOTED", {
						baseError: e,
					});
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

export const voteService = new VoteService(upvoteRepository, downvoteRepository);
