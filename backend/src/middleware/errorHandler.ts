import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "zod-validation-error";
import { ApplicationError } from "../errors/ApplicationError";
import { errorCodes } from "../errors/errorCodes";

export function handleAsyncErrors(fn: (...args: any[]) => Promise<void>) {
	return async function handler(req: Request, res: Response, next: NextFunction) {
		fn(req, res, next).catch(next);
	};
}

function handleApplicationError(res: Response, err: ApplicationError) {
	if (err.baseError instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.baseError.code === "P2002") {
			const errorType = errorCodes["NAME_ALREADY_EXISTS"];

			return res.status(errorType.code).json({ error: { message: errorType.message } });
		}

		if (err.baseError instanceof Prisma.PrismaClientValidationError) {
			const code = 400;
			return res.status(code).json({ error: { message: err.baseError.message } });
		}
	}

	const errorType = errorCodes[err.message] || errorCodes["UNKNOWN_ERROR"];

	const code = errorType.code;
	const message = errorType.message;

	return res.status(code).json({ error: { message } });
}

function handleValidationError(res: Response, err: ValidationError) {
	return res.status(400).json({ error: { message: err.message } });
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	const isApplicationError = err instanceof ApplicationError;
	const isValidationError = err instanceof ValidationError;

	if (isValidationError) return handleValidationError(res, err);

	if (isApplicationError) return handleApplicationError(res, err);

	const unknownError = errorCodes["UNKNOWN_ERROR"];

	return res.status(unknownError.code).json({ error: { message: unknownError.message } });
}
