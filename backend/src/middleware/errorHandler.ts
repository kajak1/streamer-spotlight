import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "zod-validation-error";
import { HttpError } from "../errors/ApplicationError";
import { errorCodes } from "../errors/errorCodes";

export function catchAsync(fn: (...args: any[]) => Promise<void>) {
	return function handler(req: Request, res: Response, next: NextFunction) {
		fn(req, res, next).catch(next);
	};
}

function handleHttpError(res: Response, err: HttpError) {
	if (err.baseError instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.baseError.code === "P2002") {
			const errorType = errorCodes["NAME_ALREADY_EXISTS"];

			return res.status(errorType.code).json({ error: { message: errorType.description } });
		}

		if (err.baseError instanceof Prisma.PrismaClientValidationError) {
			const code = 400;
			return res.status(code).json({ error: { message: err.baseError.message } });
		}
	}

	return res.status(err.code).json(err.serialize());
}

function handleValidationError(res: Response, err: ValidationError) {
	return res.status(400).json({ error: { message: err.message } });
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	const isHttpError = err instanceof HttpError;
	const isValidationError = err instanceof ValidationError;

	if (isValidationError) return handleValidationError(res, err);
	if (isHttpError) return handleHttpError(res, err);

	const unknownError = errorCodes["UNKNOWN_ERROR"];

	return res.status(unknownError.code).json({ error: { message: unknownError.description } });
}
