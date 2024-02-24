import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { Logger } from "winston";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
	const logger = container.resolve<Logger>("Logger");
	logger.info(`${req.method} ${req.url}`);
	next();
}

export function socketLoggerIncoming(eventName: string) {
	const logger = container.resolve<Logger>("Logger");

	logger.info(`Websocket received: ${eventName}`);
}

export function socketLoggerOutcoming(eventName: string) {
	const logger = container.resolve<Logger>("Logger");
	logger.info(`Websocket sent: ${eventName}`);
}
