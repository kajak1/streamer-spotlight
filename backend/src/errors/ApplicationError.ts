import { CustomError, SerializedError } from "./CustomError";
import { ErrorCodes } from "./errorCodes";

export class ApplicationError extends CustomError {
	constructor(message: ErrorCodes, baseError?: unknown) {
		super(message, baseError);
	}

	override serialize(): SerializedError {
		return {
			message: this.message,
		};
	}
}
