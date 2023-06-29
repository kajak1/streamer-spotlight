import { NextFunction, Request, Response } from "express";
import { ZodType, ZodError, AnyZodObject } from "zod";
import { fromZodError } from "zod-validation-error";

export function validateBody(schema: ZodType) {
	return function validatorMiddleware(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			schema.parse(req.body);
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				const validationError = fromZodError(e);
				next(validationError);
			}
			next(e);
		}
	};
}

export function validateParams(schema: AnyZodObject) {
	return function validatorMiddleware(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			schema.parse(req.params);
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				const validationError = fromZodError(e);
				next(validationError);
			}
			next(e);
		}
	};
}
