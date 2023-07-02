import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { logger } from "../../logger";
import { ApplicationError } from "../errors/ApplicationError";
import { StreamerForm, StreamerIdParam, VoteTypeBody } from "../shared.types";
import { streamersRepository } from "./streamers.repository";

class StreamersController {
	constructor() {
		// empty
	}

	getAll = async (req: Request, res: Response, next: NextFunction) => {
		const streamersRaw = await streamersRepository.findAll();

		res.status(200).json(streamersRaw);
	};

	async getSpecific(req: Request<StreamerIdParam>, res: Response) {
		const { streamerId } = req.params;

		const streamerFoundRaw = await streamersRepository.findOne({
			id: streamerId,
		});

		if (!streamerFoundRaw) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json(streamerFoundRaw);
	}

	async upload(req: Request<unknown, unknown, StreamerForm>, res: Response) {
		const streamerToUpload = req.body;

		const createdStreamer = await streamersRepository.insert(streamerToUpload);
		logger.info(
			`Created streamer ${createdStreamer.name} #${createdStreamer.id}`
		);

		// io.emit(EVENTS.STREAMER_ADDED, createdStreamer);
		res.status(200).json(createdStreamer);
	}

	async vote(
		req: Request<StreamerIdParam, unknown, VoteTypeBody>,
		res: Response
	) {
		const { streamerId } = req.params;
		const { voteType } = req.body;

		const updatedStreamer = await streamersRepository.vote(
			streamerId,
			voteType
		);

		if (!updatedStreamer) {
			res.status(500).json({ message: "failed to vote" });
			return;
		}

		// io.emit(EVENTS.VOTE, {
		// 	id: updatedStreamer.id,
		// 	upvotes: updatedStreamer.upvotes,
		// 	downvotes: updatedStreamer.downvotes,
		// });

		res.status(200).json({ message: "voted successfully" });
	}
}

export const streamersController = new StreamersController();
