import { ErrorTags } from "./errorCodes";

abstract class CustomError extends Error {
	constructor(public override message: ErrorTags, ) {
		super(message);
		this.name = this.constructor.name;
	}
}

export { CustomError };
