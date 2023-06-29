import { CustomError, SerializedError } from "./CustomError";
import { ErrorCodes } from "./errorCodes";

export class HttpError extends CustomError {
	constructor(message: ErrorCodes) {
		super(message);
	}

	override serialize(): SerializedError {
		return {
			message: this.message,
		};
	}
}
