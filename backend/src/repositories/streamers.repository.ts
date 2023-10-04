import { Prisma, Streamer } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import { UploadBody } from "../shared.types";
import { getPrismaClient } from "../prismaClient";

class StreamersRepository {
	constructor() {}

	findAll = async () => {
		try {
			const allUsers = await getPrismaClient().streamer.findMany({});
			// const allUsers = await getPrismaClient().streamer.findMany({
			// 	include: {
			// 		_count: {
			// 			select: {
			// 				Downvote: true,
			// 				Upvote: true,
			// 			},
			// 		},
			// 	},
			// });

			return allUsers;
		} catch (e) {
			throw new ApplicationError("NOT_FOUND", e);
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

	insert = async (streamerToUpload: UploadBody) => {
		const assignedPlatform = await getPrismaClient().platform.findUnique({
			where: {
				type: streamerToUpload.platform,
			},
		});

		const platforms = await getPrismaClient().platform.findMany();
		console.log("platforms:", platforms);
		if (!assignedPlatform) throw new ApplicationError("PLATFORM_NOT_ALLOWED");

		const createdStreamer = await getPrismaClient().streamer.create({
			data: {
				name: streamerToUpload.name,
				description: streamerToUpload.description,
				platformId: assignedPlatform.id,
			},
			include: {
				Platform: {
					select: {
						type: true,
					},
				},
			},
		});

		return createdStreamer;
	};
}

export const streamersRepository = new StreamersRepository();
