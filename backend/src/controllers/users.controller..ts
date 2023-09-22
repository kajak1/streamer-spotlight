import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import { usersRepository } from "../repositories/users.repostitory";
import { logger } from "../logger";
import { GetSpecificParams } from "../shared.types";

class UsersController {
	constructor() {
		// empty
	}

	throwError = () => {
		throw new ApplicationError("UNKNOWN_ERROR");
	};

	getVotes = async (req: Request, res: Response, next: NextFunction) => {
		logger.warn(`users.controller.getVotes(); req.ip: ${req.ip}`);
		const castedVotes = await usersRepository.getVotes(req.ip);

		if (!castedVotes) res.status(500);

		res.status(200).json(castedVotes);
	};

	getVotesOnStreamer = async (req: Request<GetSpecificParams>, res: Response, next: NextFunction) => {
		const { streamerId } = req.params;
		logger.warn(`users.controller.getVotesOnStreamer(); req.ip: ${req.ip}`);
		const castedVotesRaw = await usersRepository.getVotes(req.ip);

		if (!castedVotesRaw) res.status(500);

		if (castedVotesRaw?.id) {
			const isDownvoted = castedVotesRaw.Downvote.map(({ streamerId }) => streamerId).reduce((prev, curr) => {
				if (prev === true) return prev;
				return curr === streamerId;
			}, false);

			const isUpvoted = castedVotesRaw.Upvote.map(({ streamerId }) => streamerId).reduce((prev, curr) => {
				if (prev === true) return prev;
				return curr === streamerId;
			}, false);

			const castedVotes: {
				userId: string;
				isUpvoted: boolean;
				isDownvoted: boolean;
			} = {
				userId: castedVotesRaw.id,
				isDownvoted,
				isUpvoted,
			};

			res.status(200).json(castedVotes);
			return;
		}
		res.status(500);
	};
}

export const usersController = new UsersController();
