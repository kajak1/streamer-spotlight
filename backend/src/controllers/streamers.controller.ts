import { Request, Response } from "express";
import z from "zod";
import { HttpError } from "../errors/ApplicationError";
import { VoteService } from "../services/vote.service";
import { GetSpecificParams, UploadBody, VoteParams, VoteTypeBody } from "../shared.types";
import { injectable } from "tsyringe";
import { UsersRepository } from "../repositories/users.repostitory";
import { StreamersRepository } from "../repositories/streamers.repository";
import { UsersService } from "../services/users.service";

export const GetByUserSchema = z.object({
	userId: z.string(),
});

export type GeByUserSchema = z.infer<typeof GetByUserSchema>;

@injectable()
export class StreamersController {
	constructor(
		private voteService: VoteService,
		private usersService: UsersService,
		private streamersRepository: StreamersRepository,
		private usersRepository: UsersRepository
	) {}

	getByUser = async (req: Request<{ userId: string }>, res: Response) => {
		const { userId } = req.params;

		const streamersByUserRaw = await this.usersRepository.findAddedStreamers({
			id: userId,
		});

		if (!streamersByUserRaw)
			throw new HttpError("NOT_FOUND", {
				description: "Streamer has not uploaded any streamers yet",
			});

		res.status(200).json(streamersByUserRaw.Streamer);
	};

	getAll = async (req: Request, res: Response) => {
		const streamersRaw = await this.streamersRepository.findAll();

		if (streamersRaw.length === 0) {
			throw new HttpError("NOT_FOUND");
		}

		res.status(200).json(streamersRaw);
	};

	getSpecific = async (req: Request<GetSpecificParams>, res: Response) => {
		const { streamerId } = req.params;

		const streamerFoundRaw = await this.streamersRepository.findAndCountVotes(streamerId);

		if (!streamerFoundRaw) {
			throw new HttpError("NOT_FOUND");
		}

		res.status(200).json(streamerFoundRaw);
	};

	getVoteCount = async (req: Request<GetSpecificParams>, res: Response) => {
		const { streamerId } = req.params;

		const voteCountRaw = await this.streamersRepository.findVoteCount({
			id: streamerId,
		});

		if (!voteCountRaw) {
			throw new HttpError("NOT_FOUND");
		}

		res.status(200).json(voteCountRaw);
	};

	upload = async (req: Request<unknown, unknown, UploadBody>, res: Response) => {
		const streamerToUpload = req.body;

		const authorId = await this.usersService.getUserIdFromSession(req.cookies);
		const createdStreamer = await this.streamersRepository.insert(streamerToUpload, authorId);

		res.status(200).json(createdStreamer);
	};

	vote = async (req: Request<VoteParams, unknown, VoteTypeBody>, res: Response) => {
		const { streamerId } = req.params;
		const { voteType, operation } = req.body;

		const streamer = await this.streamersRepository.findUnique({
			where: {
				id: streamerId,
			},
		});

		// TODO check OWASP for proper message
		if (streamer === null)
			throw new HttpError("NOT_FOUND", {
				description: "Streamer you want to vote on does not exist",
			});

		const userId = await this.usersService.getUserIdFromSession(req.cookies);

		const voteSucceeded = await this.voteService.vote({
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
