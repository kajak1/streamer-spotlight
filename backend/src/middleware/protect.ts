import { NextFunction, Request, Response } from "express";
import { authRepository } from "../repositories/auth.repository";
import { logger } from "../logger";

export async function protect(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { sessionId } = req.cookies;

	if (!sessionId) {
		logger.warn("protect !sessionId");
		res.status(403).send();
		return;
	}

	const isSessionActive = await authRepository.isSessionActive(sessionId);

	if (isSessionActive) {
		next();
	} else {
		res.status(403).send();
	}
}
