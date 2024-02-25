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

	public hash = (password: string) => {
		return argon2.hash(password, {
			type: argon2.argon2id,
		});
	};

	public verifyPassword = (passwordHash: string, providedPassword: string) => {
		return argon2.verify(passwordHash, providedPassword, {
			type: argon2.argon2id,
		});
	};

	private validateCredentials = async (credentials: Credentials, passwordHash: string): Promise<void> => {
		if (!credentials.username || !credentials.password) throw new HttpError("UNAUTHORIZED");

		if (credentials.password.length < 8)
			throw new HttpError("INVALID_CREDENTIALS", {
				description: "Password's length must be at least 8 characters",
			});

		if (credentials.password.length >= 64)
			throw new HttpError("INVALID_CREDENTIALS", {
				description: "Password's length must be less than 64 characters",
			});

		const isPasswordValid = await this.verifyPassword(passwordHash, credentials.password);

		if (!isPasswordValid) throw new HttpError("INVALID_CREDENTIALS");
	};

	login = async (credentials: Credentials): Promise<Cookie> => {
		const second_ms = 1000;
		const minute_ms = second_ms * 60;

		const user = await this.usersRepository.find({
			where: {
				username: credentials.username,
			},
		});

		if (!user) throw new HttpError("INVALID_CREDENTIALS");

		await this.validateCredentials(credentials, user.password);

		const sessionLength = minute_ms * 5;
		const sessionId = await this.authRepository.createSession(user.id, sessionLength);

		this.logger.warn(`set cookie sessionId to ${sessionId} `);

		// TODO should cookie be encrypted? even if ecrypted, copied value can be used in the same way
		const cookie = {
			name: "sessionId",
			value: sessionId,
			options: {
				signed: true,
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: sessionLength,
			},
		} satisfies Cookie;

		return cookie;
	};
}
