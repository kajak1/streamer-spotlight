import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/HttpError";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof HttpError) {
		return res.status(err.code).json({ error: err.serialize() });
	}

	return res.status(500).json({ error: { message: "Server fault" } });
}
