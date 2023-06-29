import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import { CustomError } from "../errors/CustomError";
import { errorCodes } from "../errors/errorCodes";
import { PrismaError } from "../errors/PrismaError";
import { Prisma } from "@prisma/client";
import { ValidationError } from "zod-validation-error";

// TODO refactor

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ValidationError) {
		return res.status(400).json({ error: { message: err.message } });
	}

	const isCustomError = err instanceof CustomError;

	if (err instanceof PrismaError) {
		if (err.baseError instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.baseError.code === "P2002") {
				const code = 400;
				const message =
					"There is a unique constraint violation, a new streamer cannot be created with this name";
				return res.status(code).json({ error: { message } });
			}
		}
		if (err.baseError instanceof Prisma.PrismaClientValidationError) {
			const code = 400;
			const message = "";
			return res.status(code).json({ error: { message } });
		}
	}
	if (err instanceof CustomError) {
		const code = errorCodes[err.message].code;
		const message = errorCodes[err.message].message;
		return res.status(code).json({ error: { message } });
	}

	if (!isCustomError)
		return res.status(500).json({ error: { message: "Server fault" } });

	if (err instanceof ApplicationError) {
		return res.status(404).json({ error: err.serialize() });
	}

	// if (err instanceof HttpError) {
	// 	return res.status(err.code || 500).json({ error: err.serialize() });
	// }
}
