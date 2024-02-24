import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/ApplicationError";
import { container } from "tsyringe";
import { Logger } from "winston";

export function errorLogger(err: Error, req: Request, res: Response, next: NextFunction) {
	const logger = container.resolve<Logger>("Logger");

	if (err instanceof HttpError) {
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
