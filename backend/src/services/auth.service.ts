import { CookieOptions } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import { logger } from "../logger";
import { AuthRepository, authRepository } from "../repositories/auth.repository";
import { UsersRepository, usersRepository } from "../repositories/users.repostitory";
import argon2 from "argon2";

interface Credentials {
	username: string;
	password: string;
}

interface Cookie {
	name: string;
	value: string;
	options: CookieOptions;
}

export class AuthService {
	constructor(private authRepository: AuthRepository, private usersRepository: UsersRepository) {}

	private validateCredentials = async (credentials: Credentials, passwordHash: string): Promise<void> => {
		if (!credentials.username || !credentials.password) throw new ApplicationError("UNAUTHORIZED");

		if (credentials.password.length < 8)
			throw new ApplicationError("INVALID_CREDENTIALS", {
				moreSpecificMessage: "Password's length must be at least 8 characters",
			});

		if (credentials.password.length > 64)
			throw new ApplicationError("INVALID_CREDENTIALS", {
				moreSpecificMessage: "Password's length must be at less than 64 characters",
			});

		const isPasswordValid = await argon2.verify(passwordHash, credentials.password);
		if (!isPasswordValid) throw new ApplicationError("INVALID_CREDENTIALS");
	};

	login = async (credentials: Credentials): Promise<Cookie> => {
		const second_ms = 1000;
		const minute_ms = second_ms * 60;

		const cookieTime = minute_ms / 3;

		const user = await this.usersRepository.find({ username: credentials.username });
		if (!user) throw new ApplicationError("INVALID_CREDENTIALS");

		await this.validateCredentials(credentials, user.password);

		const sessionId = await this.authRepository.createSession(user.id);

		logger.warn(`set cookie sessionId to ${sessionId} `);

		const cookie = {
			name: "sessionId",
			value: sessionId,
			options: {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: cookieTime,
			},
		} satisfies Cookie;

		return cookie;
	};
}

export const authService = new AuthService(authRepository, usersRepository);
