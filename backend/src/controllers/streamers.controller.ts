import { Request, Response } from "express";
import z from "zod";
import { ApplicationError } from "../errors/ApplicationError";
import { streamersRepository } from "../repositories/streamers.repository";
import { usersRepository } from "../repositories/users.repostitory";
import { usersService } from "../services/users.service";
import { voteService } from "../services/vote.service";
import { GetSpecificParams, UploadBody, VoteParams, VoteTypeBody } from "../shared.types";

export const GetByUserSchema = z.object({
	userId: z.string(),
});

export type GeByUserSchema = z.infer<typeof GetByUserSchema>;

class StreamersController {
	constructor() {}

	getByUser = async (req: Request<{ userId: string }>, res: Response) => {
		const { userId } = req.params;

		const streamersByUserRaw = await usersRepository.findAddedStreamers({
			id: userId,
		});

		if (!streamersByUserRaw)
			throw new ApplicationError("NOT_FOUND", {
				moreSpecificMessage: "Streamer has not uploaded any streamers yet",
			});

		res.status(200).json(streamersByUserRaw.Streamer);
	};

	getAll = async (req: Request, res: Response) => {
		const streamersRaw = await streamersRepository.findAll();

		if (streamersRaw.length === 0) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(streamersRaw);
	};

	getSpecific = async (req: Request<GetSpecificParams>, res: Response) => {
		const { streamerId } = req.params;

		const streamerFoundRaw = await streamersRepository.findAndCountVotes(streamerId);

		if (!streamerFoundRaw) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(streamerFoundRaw);
	};

	getVoteCount = async (req: Request<GetSpecificParams>, res: Response) => {
		const { streamerId } = req.params;

		const voteCountRaw = await streamersRepository.findVoteCount({
			id: streamerId,
		});

		if (!voteCountRaw) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(voteCountRaw);
	};

	upload = async (req: Request<unknown, unknown, UploadBody>, res: Response) => {
		const streamerToUpload = req.body;

		const authorId = await usersService.getUserIdFromSession(req.cookies);
		const createdStreamer = await streamersRepository.insert(streamerToUpload, authorId);

		res.status(200).json(createdStreamer);
	};

	vote = async (req: Request<VoteParams, unknown, VoteTypeBody>, res: Response) => {
		const { streamerId } = req.params;
		const { voteType, operation } = req.body;

		const streamer = await streamersRepository.findUnique({
			where: {
				id: streamerId,
			},
		});

		// TODO check OWASP for proper message
		if (streamer === null)
			throw new ApplicationError("NOT_FOUND", {
				moreSpecificMessage: "Streamer you want to vote on does not exist",
			});

		const userId = await usersService.getUserIdFromSession(req.cookies);

		const voteSucceeded = await voteService.vote({
			userId: userId,
			streamerId,
			voteType,
			operation,
		});

		if (!voteSucceeded) {
			res.status(500).json({ message: "failed to vote" });
			return;
		}

		res.status(200).json({ message: "voted successfully" });
	};
}

export const streamersController = new StreamersController();
