import { ErrorCodes } from "./errorCodes";

abstract class CustomError extends Error {
	constructor(public override message: ErrorCodes) {
		super(message);

		Error.captureStackTrace(this, this.constructor);
	}
}

export { CustomError };
