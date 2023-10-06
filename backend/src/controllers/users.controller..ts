import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import { logger } from "../logger";
import { usersRepository } from "../repositories/users.repostitory";
import { GetSpecificParams } from "../shared.types";
import { getRedisClient } from "../redis";
import { getPrismaClient } from "../prismaClient";

class UsersController {
	constructor() {
		// empty
	}

	getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const { sessionId } = req.cookies;

		if (!sessionId) {
			res.status(401).json("no cookie");
			return;
		}

		const userId = await getRedisClient().get(`session:${sessionId}`);

		if (!userId) {
			res.status(403).json("no user connected to this session id");
			return;
		}

		const userData = await getPrismaClient().user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!userId) {
			res.status(404).json("user does not exist");
			return;
		}

		res.status(200).json(userData);
	};

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
