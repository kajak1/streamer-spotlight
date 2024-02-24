import { v4 as uuid } from "uuid";
import { getRedisClient } from "../redis";
import { HttpError } from "../errors/ApplicationError";
import { inject, injectable } from "tsyringe";
import { Logger } from "winston";

// TODO clean up types in whole app
export type LoginBody = {
	username: string;
	password: string;
};

@injectable()
export class AuthRepository {
	constructor(@inject("Logger") private logger: Logger) {}

	private invalidateSession = async (sessionId: string): Promise<void> => {
		try {
			const redis = await getRedisClient()
			await redis.del(`session:${sessionId}`);

		} catch (e) {
			this.logger.error(`Failed to remove session #id:${sessionId} from redis`);
		}
	};

	createSession = async (userId: string, duration: number): Promise<string> => {
		const sessionId = uuid();
		// 9c11e7ec-2b64-4fa5-8bd3-81093aac6ca3
		try {
			const redis = await getRedisClient()
			await redis.set(`session:${sessionId}`, userId);
			this.logger.warn(`Created session #id:${sessionId}`);

			setTimeout(() => this.invalidateSession(sessionId), duration);

			return sessionId;
		} catch (e) {
			this.logger.error(`Failed to create a session #id:${sessionId}`);
			throw new HttpError("UNKNOWN_ERROR", {
				description: "Failed to create a session",
			});
		}
	};

	isSessionActive = async (sessionId: string): Promise<boolean> => {
		const redis = await getRedisClient()
		const possibleSession = await redis.get(`session:${sessionId}`);

		const isSessionActive = possibleSession !== null;
		return isSessionActive;
	};
}
