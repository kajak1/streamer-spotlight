import * as argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/ApplicationError";
import { getRedisClient } from "../redis";
import { LoginBody } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import { UsersRepository } from "../repositories/users.repostitory";
import { injectable } from "tsyringe";

@injectable()
export class AuthController {
	constructor(
		private usersService: UsersService,
		private usersRepository: UsersRepository,
		private authService: AuthService
	) {}

	throwError = async (req: Request) => {};

	register = async (req: Request<unknown, unknown, LoginBody>, res: Response): Promise<void> => {
		const { username, password } = req.body;

		const isUsernameAvailable = await this.usersService.isUsernameAvailable({ username: username });
		if (!isUsernameAvailable) throw new HttpError("FORBIDDEN_USERNAME");

		const hash = await argon2.hash(password, {
			type: argon2.argon2id,
		});

		await this.usersRepository.insert({ username, password: hash });

		res.status(200).json("Registered");
	};

	login = async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
		// TODO decode from base64?
		const { username, password } = req.body;

		const cookie = await this.authService.login({ username, password });
		res.status(200).cookie(cookie.name, cookie.value, cookie.options).json("Logged in");
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		const { sessionId } = req.cookies;

		try {
			const redis = await getRedisClient();
			redis.del(`session:${sessionId}`);

			res.status(200).json("Logged out successfully");
		} catch (e) {
			res.status(500).json("Failed to logout");
		}
	};
}