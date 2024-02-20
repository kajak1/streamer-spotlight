import { Prisma, Streamer } from "@prisma/client";
import { HttpError } from "../errors/ApplicationError";
import { UploadBody } from "../shared.types";
import { getPrismaClient } from "../prismaClient";

export class StreamersRepository {
	constructor() {}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().streamer.findMany({});

			return allUsers;
		} catch (e) {
			if (e instanceof Error) {
				throw new HttpError("NOT_FOUND", {
					baseError: e,
				});
			} else {
				throw new HttpError("UNKNOWN_ERROR");
			}
		}
	};

	findUnique = async (params: Prisma.StreamerFindUniqueArgs) => {
		const foundUser = await getPrismaClient().streamer.findUnique(params);

		return foundUser;
	};

	findVoteCount = async (params: Prisma.StreamerWhereUniqueInput) => {
		const foundVotesCount = await getPrismaClient().streamer.findUnique({
			where: params,
			select: {
				id: true,
				_count: {
					select: {
						Downvote: true,
						Upvote: true,
					},
				},
			},
		});

		return foundVotesCount;
	};

	findAndCountVotes = async (id: Streamer["id"]) => {
		const countedVotesRaw = await getPrismaClient().streamer.findUnique({
			where: {
				id: id,
			},
			include: {
				_count: {
					select: {
						Downvote: true,
						Upvote: true,
					},
				},
			},
		});

		return countedVotesRaw;
	};

	insert = async (streamerToUpload: UploadBody, uploaded_by: string) => {
		const assignedPlatform = await getPrismaClient().platform.findUnique({
			where: {
				type: streamerToUpload.platform,
			},
		});

		if (!assignedPlatform) throw new HttpError("PLATFORM_NOT_ALLOWED");

		const createdStreamer = await getPrismaClient().streamer.create({
			data: {
				name: streamerToUpload.name,
				description: streamerToUpload.description,
				platformId: assignedPlatform.id,
				uploaded_by: uploaded_by,
			},
			include: {
				Platform: true,
				User: true,
			},
		});

		return createdStreamer;
	};
}