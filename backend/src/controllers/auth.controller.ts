import { NextFunction, Request, Response } from "express";
import { LoginBody, authRepository } from "../repositories/auth.repository";
import { usersRepository } from "../repositories/users.repostitory";
import { ApplicationError } from "../errors/ApplicationError";
import { logger } from "../logger";
import { v4 as uuid } from "uuid";
import { getRedisClient } from "../redis";

class AuthController {
	constructor() {
		// empty
	}

	register = async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
		const { username, password } = req.body;

		const isUsernameAvailable = await usersRepository.isUsernameAvailable(username);
		if (!isUsernameAvailable) throw new ApplicationError("NAME_ALREADY_EXISTS");

		await usersRepository.insert({ username, password });

		res.json("Registered");
	};

	login = async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
		// decode from base64?
		const { username, password } = req.body;

		// const sessionId = uuid();
		// logger.warn(`set cookie sessionId to ${sessionId} `);

		// const second_ms = 1000;
		// const minute_ms = second_ms * 60;
		// res.cookie("sessionId", sessionId, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	sameSite: "none",
		// 	maxAge: minute_ms * 5,
		// });

		// res.send("Logged in");

		if (!username || !password) {
			res.status(401).json("Unauthorized");
			return;
		}

		const user = await usersRepository.find(username);
		// TODO check OWASP for appropriate response message
		if (!user) throw new ApplicationError("NOT_FOUND");

		// TODO check if credentials are correct

		const sessionId = await authRepository.createSession(user.id);

		logger.warn(`set cookie sessionId to ${sessionId} `);

		const second_ms = 1000;
		const minute_ms = second_ms * 60;
		res.cookie("sessionId", sessionId, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: minute_ms * 5,
		});

		res.send("Logged in");
	};

	logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const { sessionId } = req.cookies;

		try {
			await getRedisClient().del(`session:${sessionId}`);
			res.status(200).json("Logged out successfully");
		} catch (e) {
			res.status(500).json("Failed to logout");
		}
	};
}

export const authController = new AuthController();
