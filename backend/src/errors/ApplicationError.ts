import { AdditionalInfo, CustomError } from "./CustomError";
import { ErrorTags, errorCodes } from "./errorCodes";

interface HttpErrorExtraProperties {
	readonly code: number;
}

export class HttpError extends CustomError implements HttpErrorExtraProperties {
	readonly code: number;
	
	constructor(message: ErrorTags, optional?: AdditionalInfo) {
		super(message, optional);

		this.code = errorCodes[message].code;
	}
}
