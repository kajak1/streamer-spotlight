import { v4 as uuid } from "uuid";
import { getRedisClient } from "../redis";
import { logger } from "../logger";

// TODO clean up types in whole app
export type LoginBody = {
	username: string;
	password: string;
};

class AuthRepository {
	constructor() {}

	private invalidateSession = async (sessionId: string): Promise<void> => {
		try {
			await getRedisClient().del(`session:${sessionId}`);
		} catch (e) {
			logger.error(`Failed to remove session #id:${sessionId} from redis`);
		}
	};

	createSession = async (userId: string): Promise<string | null> => {
		const sessionId = uuid();

		try {
			await getRedisClient().set(`session:${sessionId}`, userId);

			const second = 1000;
			const minute = second * 60;

			// TODO make session length longer
			setTimeout(() => this.invalidateSession(sessionId), 0.5 * minute);

			return sessionId;
		} catch (e) {
			logger.error(`Failed to create a session #id:${sessionId}`);
			return null;
		}
	};

	isSessionActive = async (sessionId: string): Promise<boolean> => {
		const possibleSession = await getRedisClient().get(`session:${sessionId}`);

		const isSessionActive = possibleSession !== null;
		return isSessionActive;
	};
}

export const authRepository = new AuthRepository();
