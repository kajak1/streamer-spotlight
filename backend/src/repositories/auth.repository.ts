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
			const client = await getRedisClient()
			await client.del(`session:${sessionId}`);

		} catch (e) {
			this.logger.error(`Failed to remove session #id:${sessionId} from redis`);
		}
	};

	createSession = async (userId: string, duration: number): Promise<string> => {
		const sessionId = uuid();

		try {
			const client = await getRedisClient()
			await client.set(`session:${sessionId}`, userId);

			// TODO make session length longer
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
		const client = await getRedisClient()
		const possibleSession = await client.get(`session:${sessionId}`);

		const isSessionActive = possibleSession !== null;
		return isSessionActive;
	};
}

// export const authRepository = new AuthRepository();
