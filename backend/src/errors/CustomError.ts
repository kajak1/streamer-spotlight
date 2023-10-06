import { ErrorCodes } from "./errorCodes";

abstract class CustomError extends Error {
	constructor(public override message: ErrorCodes) {
		super(message);
		this.name = this.constructor.name;
	}
}

export { CustomError };
