import { CustomError, SerializedError } from "./CustomError";

class HttpError extends CustomError {
	override name = "HttpError";

	constructor(public code: number, message: string) {
		super(message);
	}

	override serialize(): SerializedError {
		return {
			message: this.message,
		};
	}
}

export { HttpError };
