import * as argon2 from "argon2";
import { CookieOptions } from "express";
import { inject, injectable } from "tsyringe";
import { HttpError } from "../errors/ApplicationError";
import { AuthRepository } from "../repositories/auth.repository";
import { UsersRepository } from "../repositories/users.repostitory";
import { Logger } from "winston";

interface Credentials {
	username: string;
	password: string;
}

interface Cookie {
	name: string;
	value: string;
	options: CookieOptions;
}

@injectable()
export class AuthService {
	constructor(
		private authRepository: AuthRepository,
		private usersRepository: UsersRepository,
		@inject("Logger") private logger: Logger
	) {}

	private validateCredentials = async (credentials: Credentials, passwordHash: string): Promise<void> => {
		if (!credentials.username || !credentials.password) throw new HttpError("UNAUTHORIZED");

		if (credentials.password.length < 8)
			throw new HttpError("INVALID_CREDENTIALS", {
				description: "Password's length must be at least 8 characters",
			});

		if (credentials.password.length > 64)
			throw new HttpError("INVALID_CREDENTIALS", {
				description: "Password's length must be at less than 64 characters",
			});

		const isPasswordValid = await argon2.verify(passwordHash, credentials.password);
		if (!isPasswordValid) throw new HttpError("INVALID_CREDENTIALS");
	};

	login = async (credentials: Credentials): Promise<Cookie> => {
		const second_ms = 1000;
		const minute_ms = second_ms * 60;

		const cookieTime = minute_ms / 3;

		const user = await this.usersRepository.find({ username: credentials.username });
		if (!user) throw new HttpError("INVALID_CREDENTIALS", {
			description: "Invalid Username or Password"
		});

		await this.validateCredentials(credentials, user.password);

		const sessionId = await this.authRepository.createSession(user.id, 5 * minute_ms);

		this.logger.warn(`set cookie sessionId to ${sessionId} `);

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