import { Request, Response } from "express";
import { streamersRepository } from "./streamers.repository";
import "express-async-errors";
import { Streamer } from "@prisma/client";
import { PrismaError } from "../errors/PrismaError";
import { HttpError } from "../errors/HttpError";

class StreamersController {
	constructor() {
		// placeholder
	}

	async getAll(req: Request, res: Response) {
		const streamersRaw = await streamersRepository.findAll();

		if (!streamersRaw) {
			res.status(500);
			throw new PrismaError("Failed to search for streamers");
		}

		res.status(200).json(streamersRaw);
	}

	async getSpecific(req: Request<{ streamerId: string }>, res: Response) {
		const { streamerId } = req.params;

		if (!streamerId) {
			throw new HttpError(400, "No id provided");
		}

		const streamerFoundRaw = await streamersRepository.findOne({
			id: streamerId,
		});

		if (!streamerFoundRaw) {
			res.status(404);
			throw new PrismaError("No users found");
		}

		res.status(200).json({ streamer: streamerFoundRaw });
	}

	async upload(req: Request<unknown, unknown, Streamer>, res: Response) {
		const streamerToUpload = req.body;

		await streamersRepository.insert(streamerToUpload);

		res.status(200).json({ msg: "streamer created successfully" });
	}

	async vote(
		req: Request<
			{ streamerId: string },
			unknown,
			{ voteType: "upvote" | "downvote" }
		>,
		res: Response
	) {
		const { streamerId } = req.params;
		const { voteType } = req.body;

		if (!streamerId) throw new HttpError(400, "StramerId param is required");
		if (!voteType) throw new HttpError(400, "VoteType in body is required");

		const updatedStreamer = await streamersRepository.vote(
			streamerId,
			voteType
		);

		if (!updatedStreamer) {
			res.status(500).json({ msg: "failed to vote" });
			return;
		}

		res.status(200).json({ msg: "voted successfully" });
	}
}

export const streamersController = new StreamersController();
