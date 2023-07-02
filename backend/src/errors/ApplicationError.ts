import { CustomError } from "./CustomError";
import { ErrorCodes } from "./errorCodes";

export class ApplicationError extends CustomError {
	constructor(message: ErrorCodes, public baseError?: unknown) {
		super(message);
	}
}
