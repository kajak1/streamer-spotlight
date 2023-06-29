import { NextFunction, Request, Response } from "express";
import { streamersRepository } from "./streamers.repository";
import "express-async-errors";
import { Streamer } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import z from "zod";

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

	async getAll(req: Request, res: Response, next: NextFunction) {
		const streamersRaw = await streamersRepository.findAll();

		res.status(200).json(streamersRaw);
	}

	async getSpecific(req: Request<StreamerIdParam>, res: Response) {
		const { streamerId } = req.params;

		const streamerFoundRaw = await streamersRepository.findOne({
			id: streamerId,
		});

		if (!streamerFoundRaw) {
			throw new ApplicationError("NOT_FOUND");
		}

		res.status(200).json({ streamer: streamerFoundRaw });
	}

	async upload(req: Request<unknown, unknown, Streamer>, res: Response) {
		const streamerToUpload = req.body;

		await streamersRepository.insert(streamerToUpload);

		res.status(200).json({ message: "streamer created successfully" });
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

		res.status(200).json({ message: "voted successfully" });
	}
}

export const streamersController = new StreamersController();
