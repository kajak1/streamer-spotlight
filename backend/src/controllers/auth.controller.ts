import { NextFunction, Request, Response } from "express";
import { LoginBody, authRepository } from "../repositories/auth.repository";

class AuthController {
	constructor() {
		// empty
	}

	register = async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
		const { username, password } = req.body;

		authRepository.createUser({ username, password });

		res.json("Registered");
	};

	login = async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
		// handle credentials from body
		// decode from base64?
		const { username, password } = req.body;
		if (!username || !password) {
			res.status(401).json("Unauthorized");
			return;
		}

		// const doesUserExist = authRepository.doesUserExist()

		// const sessionId = authRepository.createSession();

		// save user to redis

		res.cookie("sessionId", sessionId, {
			httpOnly: true,
			secure: true,
		});

		res.send("Logged in");
	};
}

export const authController = new AuthController();
