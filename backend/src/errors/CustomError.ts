import { ErrorCodes } from "./errorCodes";

export interface SerializedError {
	message: string;
}

abstract class CustomError extends Error {
	constructor(public override message: ErrorCodes, public baseError?: unknown) {
		super(message);

		Error.captureStackTrace(this, this.constructor);
	}

	abstract serialize(): SerializedError;
}

export { CustomError };
