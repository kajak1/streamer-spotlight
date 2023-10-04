import { NextFunction, Request, Response } from "express";
import { authRepository } from "../repositories/auth.repository";

export async function protect(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { sessionId } = req.cookies;

	if (!sessionId) {
		res.status(403).json("Forbidden");
		return;
	}

	const isSessionActive = await authRepository.isSessionActive(sessionId);

	if (isSessionActive) {
		next();
	} else {
		res.status(403).json("Forbidden");
	}

	// check if sessionId is valid
	// if yes -> next()
	// if not -> 403
}

export async function dontprotect(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { sessionId } = req.cookies;

	if (!sessionId) {
		res.status(403).json("Forbidden");
		return;
	}

	next();

	// check if sessionId is valid
	// if yes -> next()
	// if not -> 401
}
