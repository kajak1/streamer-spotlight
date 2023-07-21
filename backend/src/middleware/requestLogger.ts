import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
	logger.info(`${req.method} ${req.url}`);
	next();
}

export function socketLoggerIncoming(eventName: string) {
	logger.info(`Websocket received: ${eventName}`);
}

export function socketLoggerOutcoming(eventName: string) {
	logger.info(`Websocket sent: ${eventName}`);
}
