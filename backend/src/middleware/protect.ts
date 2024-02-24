import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repositories/auth.repository";
import { HttpError } from "../errors/ApplicationError";
import { catchAsync } from "./errorHandler";
import { container } from "tsyringe";
import { Logger } from "winston";

async function handleProtect(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { sessionId } = req.signedCookies;
	// const { sessionId } = req.signedCookies;
	const logger = container.resolve<Logger>("Logger");
	
	if (!sessionId) {
		logger.warn(`no ID: ${sessionId}`)
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
