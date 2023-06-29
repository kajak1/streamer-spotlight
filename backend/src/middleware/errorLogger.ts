import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";

export function errorLogger(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	logger.error(err.stack);
	next(err);
}
