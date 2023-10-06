import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { ApplicationError } from "../errors/ApplicationError";
import { GetSpecificParams, UploadBody, VoteParams, VoteTypeBody } from "../shared.types";
import { streamersRepository } from "../repositories/streamers.repository";
import { streamersService } from "../services/streamers.service";
import { getPrismaClient } from "../prismaClient";

class StreamersController {
	constructor() {
		// empty
	}

	// getPlatforms = async (req: Request, res: Response, next: NextFunction) => {
	// 	const platforms = await getPrismaClient().platform.findMany({});
	// 	console.log("platforms:", platforms);
	// };

	// createPlatform = async (req: Request, res: Response, next: NextFunction) => {
	// 	const { platformType } = req.params;
	// 	if (!platformType) throw new ApplicationError("PLATFORM_NOT_ALLOWED");
	// 	const platformCreated = await getPrismaClient().platform.create({
	// 		data: {
	// 			type: platformType,
	// 		},
	// 	});
	// 	console.log("platformCreated:", platformCreated);
	// };

	async getAll(req: Request, res: Response, next: NextFunction) {
		logger.warn(`streamers.controller.getAll(): req.ip: ${req.ip}`);

		const streamersRaw = await streamersRepository.findAll();

		if (streamersRaw.length === 0) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(streamersRaw);
	}

	async getSpecific(req: Request<GetSpecificParams>, res: Response, next: NextFunction) {
		const { streamerId } = req.params;

		const streamerFoundRaw = await streamersRepository.findAndCountVotes(streamerId);

		if (!streamerFoundRaw) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(streamerFoundRaw);
	}

	getVoteCount = async (req: Request<GetSpecificParams>, res: Response, next: NextFunction) => {
		const { streamerId } = req.params;
		const voteCountRaw = await streamersRepository.findVoteCount({
			id: streamerId,
		});

		if (!voteCountRaw) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(voteCountRaw);
	};

	async upload(req: Request<unknown, unknown, UploadBody>, res: Response, next: NextFunction) {
		const streamerToUpload = req.body;

		const createdStreamer = await streamersRepository.insert(streamerToUpload);
		logger.info(`Created streamer ${createdStreamer.name} #${createdStreamer.id}`);

		res.status(200).json(createdStreamer);
	}

	async vote(req: Request<VoteParams, unknown, VoteTypeBody>, res: Response, next: NextFunction) {
		const { streamerId } = req.params;
		const { voteType, operation } = req.body;

		const streamer = await streamersRepository.findUnique({
			where: {
				id: streamerId,
			},
		});

		if (streamer === null) {
			res.status(400).json({ message: "streamer you want to vote on does not exist" });
			return;
		}

		logger.warn(`streamers.controller.vote(): userId: ${req.ip}`);
		const voteSucceeded = await streamersService.vote({
			userId: req.ip,
			streamerId,
			voteType,
			operation,
		});

		if (!voteSucceeded) {
			res.status(500).json({ message: "failed to vote" });
			return;
		}

		res.status(200).json({ message: "voted successfully" });
	}
}

export const streamersController = new StreamersController();
