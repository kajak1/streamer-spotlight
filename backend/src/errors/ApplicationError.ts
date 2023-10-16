import { CustomError } from "./CustomError";
import { ErrorTags } from "./errorCodes";

export class ApplicationError extends CustomError {
	baseError?: unknown;
	moreSpecificMessage?: string;

	constructor(
		message: ErrorTags,
		optional?: {
			moreSpecificMessage?: string;
			baseError?: unknown;
		}
	) {
		super(message);

		this.baseError = optional?.baseError;

		if (optional?.moreSpecificMessage) {
			this.moreSpecificMessage = optional?.moreSpecificMessage;
		}
	}
}
