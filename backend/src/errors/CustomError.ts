export interface SerializedError {
	message: string;
}

abstract class CustomError extends Error {
	constructor(message: string) {
		super(message);

		Error.captureStackTrace(this, this.constructor);
	}

	abstract serialize(): SerializedError;
}

export { CustomError };
