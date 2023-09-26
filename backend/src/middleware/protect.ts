import { NextFunction, Request, Response } from "express";
import { authRepository } from "../repositories/auth.repository";

export function protect(req: Request, res: Response, next: NextFunction): void {
	const { sessionId } = req.cookies;
	
	if (!sessionId) {
		res.status(401).json("Unauthorized");
		return;
	}

	const isSessionActive = authRepository.isActive(sessionId);

	if (isSessionActive) {
		next();
	} else {
		res.status(401).json("Unauthorized");
	}

	// check if sessionId is valid
	// if yes -> next()
	// if not -> 401
}
