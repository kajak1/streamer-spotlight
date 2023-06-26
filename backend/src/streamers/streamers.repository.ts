import { logger } from "../../logger";
import { prisma } from "../prisma";

class StreamersRepository {
	constructor() {
		// placeholder
	}

	async findAll() {
		logger.info("StreamersRepository.findAll()");
		try {
			const allUsers = await prisma.streamer.findMany();
			logger.info(`${JSON.stringify(allUsers, null, 2)}`);
		} catch (e) {
			logger.error(`${JSON.stringify(e, null, 2)}`);
		}
	}

	findOne() {
		// placeholder
	}

	insert() {
		// placeholder
	}

	modify() {
		// placeholder
	}
}

export const streamersRepository = new StreamersRepository();
