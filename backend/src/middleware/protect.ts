import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repositories/auth.repository";
import { HttpError } from "../errors/ApplicationError";
import { catchAsync } from "./errorHandler";
import { container } from "tsyringe";

async function handleProtect(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { sessionId } = req.cookies;

	if (!sessionId) {
		throw new HttpError("UNAUTHORIZED");
	}

	const authRepository = container.resolve(AuthRepository);
	const isSessionActive = await authRepository.isSessionActive(sessionId);

	if (isSessionActive) {
		next();
	} else {
		res.status(403).send();
	}
}

export const protect = catchAsync(handleProtect);
