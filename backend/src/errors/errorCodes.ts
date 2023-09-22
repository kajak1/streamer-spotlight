export type ErrorCodes =
	| "UNKNOWN_ERROR"
	| "NOT_FOUND"
	| "MISSING_PARAMETERS"
	| "MISSING_BODY"
	| "NAME_ALREADY_EXISTS"
	| "ALREADY_VOTED"
	| "PLATFORM_NOT_ALLOWED";

type ErrorCodesMap = {
	[ErrorTag in ErrorCodes]: {
		code: number;
		message: string;
	};
};

export const errorCodes: ErrorCodesMap = {
	UNKNOWN_ERROR: {
		code: 500,
		message: "Internal server error",
	},
	NOT_FOUND: {
		code: 404,
		message: "Not found",
	},
	MISSING_PARAMETERS: {
		code: 400,
		message: "Missing parameter",
	},
	MISSING_BODY: {
		code: 400,
		message: "Missing body",
	},
	NAME_ALREADY_EXISTS: {
		code: 400,
		message: "Streamer with this name already exists",
	},
	ALREADY_VOTED: {
		code: 400,
		message: "You have already voted",
	},
	PLATFORM_NOT_ALLOWED: {
		code: 400,
		message: "Chosen platform is not allowed",
	},
};
