import { CustomError, SerializedError } from "./CustomError";

class PrismaError extends CustomError {
	override name = "PrismaError";

	constructor(message: string) {
		super(message);
	}

	override serialize(): SerializedError {
		return {
			message: this.message,
		};
	}
}

export { PrismaError };
