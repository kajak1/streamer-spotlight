import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { ApplicationError } from "../errors/ApplicationError";

export function errorLogger(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ApplicationError) {
		if (err.baseError instanceof Error) {
			logger.error(err.baseError.stack);
		} else {
			logger.error(err.stack);
		}
	} else {
		logger.error(err.stack);
	}
	next(err);
}
