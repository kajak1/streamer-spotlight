import z from "zod";
import { ErrorTags, errorCodes } from "./errorCodes";

export const SerializedErrorSchema = z.object({
	error: z.object({
		message: z.string(),
		description: z.optional(z.string()),
	}),
});

type SerializedError = z.infer<typeof SerializedErrorSchema>

export interface AdditionalInfo {
	baseError?: Error;
	description?: string;
}

abstract class CustomError extends Error implements AdditionalInfo {
	baseError?: Error;
	description?: string;

	constructor(public override message: ErrorTags, optional?: AdditionalInfo) {
		super(message);
		this.name = this.constructor.name;

		if (optional) {
			if (optional.baseError) {
				this.baseError = optional.baseError;
			}
			if (optional.description) {
				this.description = optional.description;
			}
		}
	}

	public serialize(): string {
		const serialized: SerializedError = {
			error: {
				message: this.message,
			},
		};

		if (this.description) {
			serialized.error.description = this.description;
		}

		return JSON.stringify(serialized);
	}
	
	public prepareToSend(): object {
		const serialized: SerializedError = {
			error: {
				message: this.message,
			},
		};

		if (this.description) {
			serialized.error.description = this.description;
		} else {
			serialized.error.description = errorCodes[this.message].description
		}

		return serialized;
	}
}

export { CustomError };
