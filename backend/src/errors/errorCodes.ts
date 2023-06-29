export type ErrorCodes =
	| "INTERNAL_ERROR"
	| "NOT_FOUND"
	| "MISSING_PARAMETERS"
	| "MISSING_BODY";

type ErrorCodesMap = {
	[ErrorTag in ErrorCodes]: {
		code: number;
		message: string;
	};
};

export const errorCodes: ErrorCodesMap = {
	INTERNAL_ERROR: {
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
};
