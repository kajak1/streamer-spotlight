import { v4 as uuid } from "uuid";
import { ApplicationError } from "../errors/ApplicationError";

export interface UserData {
	username: string;
	password: string;
	id: string;
	sessionId: string | null;
}

export type LoginBody = Pick<UserData, "password" | "username">;

class AuthRepository {
	private activeSessions: string[] = [];
	// private users_db: UsersDb = {};
	private users_db = new Map<string, UserData>();

	constructor() {
		// asd
	}

	doesUserExist = (userId: string): boolean => {
		return this.users_db.has(userId);
	};

	createUser = (loginBody: LoginBody): string => {
		// TODO check is data is valid
		const userId = uuid();
		this.users_db.set(userId, { ...loginBody, id: userId, sessionId: null });

		return userId;
	};

	private invalidateSession = (sessionId: string, user: UserData): void => {
		// Prosmie.all
		this.activeSessions = this.activeSessions.filter((session) => session !== sessionId);
		this.users_db.set(user.id, { ...user, sessionId: null });
	};

	createSession = (userId: string): string => {
		const user = this.users_db.get(userId);

		if (!user) throw new ApplicationError("NOT_FOUND");

		const sessionId = uuid();

		// Prosmie.all
		this.activeSessions.push(sessionId);
		this.users_db.set(userId, { ...user, sessionId: sessionId });

		const second = 1000;
		const minute = second * 60;

		setTimeout(() => this.invalidateSession(sessionId, user), 5 * minute);

		return sessionId;
	};

	isActive(sessionId: string) {
		return this.activeSessions.includes(sessionId);
	}
}

export const authRepository = new AuthRepository();
