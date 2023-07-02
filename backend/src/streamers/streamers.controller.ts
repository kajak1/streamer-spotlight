import { NextFunction, Request, Response } from "express";
import { streamersRepository } from "./streamers.repository";
import "express-async-errors";
import { ApplicationError } from "../errors/ApplicationError";
import z from "zod";
import { StreamerFormData } from "../schemas";
import { io } from "..";
import { SOCKET_EVENTS } from "../socket";

export const voteTypeSchema = z.object({
	voteType: z.union([z.literal("upvote"), z.literal("downvote")]),
});

export const streamerIdSchema = z.object({
	streamerId: z.string(),
});

type StreamerIdParam = z.infer<typeof streamerIdSchema>;
type VoteTypeBody = z.infer<typeof voteTypeSchema>;

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

	async upload(
		req: Request<unknown, unknown, StreamerFormData>,
		res: Response
	) {
		const streamerToUpload = req.body;

		const createdStreamer = await streamersRepository.insert(streamerToUpload);

		io.emit(SOCKET_EVENTS.STREAMER_ADDED, createdStreamer);
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

		io.emit(SOCKET_EVENTS.STREAMER_ADDED, {
			id: updatedStreamer.id,
			upvotes: updatedStreamer.upvotes,
			downvotes: updatedStreamer.downvotes,
		});
		res.status(200).json({ message: "voted successfully" });
	}
}

export const streamersController = new StreamersController();
