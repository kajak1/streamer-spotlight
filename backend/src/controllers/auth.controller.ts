import argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import { getRedisClient } from "../redis";
import { LoginBody } from "../repositories/auth.repository";
import { AuthService, authService } from "../services/auth.service";
import { UsersService, usersService } from "../services/users.service";
import { UsersRepository, usersRepository } from "../repositories/users.repostitory";

interface AuthControllerConstructorParams {
	usersService: UsersService;
	usersRepository: UsersRepository;
	authService: AuthService;
}

class AuthController {
	constructor(
		private usersService: UsersService,
		private usersRepository: UsersRepository,
		private authService: AuthService
	) {}

	throwError = async (req: Request) => {
		const { username, password } = req.body;

		const cookie = await this.authService.login({ username, password });
		// throw new ApplicationError("MISSING_BODY");
	};

	register = async (req: Request<unknown, unknown, LoginBody>, res: Response): Promise<void> => {
		const { username, password } = req.body;

		const isUsernameAvailable = await this.usersService.isUsernameAvailable({ username: username });
		if (!isUsernameAvailable) throw new ApplicationError("FORBIDDEN_USERNAME");

		const hash = await argon2.hash(password, {
			type: argon2.argon2id,
		});

		await this.usersRepository.insert({ username, password: hash });

		res.status(200).json("Registered");
	};

	login = async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
		// TODO decode from base64?
		const { username, password } = req.body;

		try {
			const cookie = await this.authService.login({ username, password });
			res.cookie(cookie.name, cookie.value, cookie.options).send("Logged in");
		} catch (e) {
			res.send("not logged");
		}
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		const { sessionId } = req.cookies;

		try {
			await getRedisClient().del(`session:${sessionId}`);
			res.status(200).json("Logged out successfully");
		} catch (e) {
			res.status(500).json("Failed to logout");
		}
	};
}

export const authController = new AuthController(usersService, usersRepository, authService);
