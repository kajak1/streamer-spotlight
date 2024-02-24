export type ErrorTags =
	| "FORBIDDEN_USERNAME"
	| "INVALID_CREDENTIALS"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "UNKNOWN_ERROR"
	| "NOT_FOUND"
	| "MISSING_PARAMETERS"
	| "MISSING_BODY"
	| "NAME_ALREADY_EXISTS"
	| "ALREADY_VOTED"
	| "PLATFORM_NOT_ALLOWED";

type ErrorCodesMap = {
	[ErrorTag in ErrorTags]: {
		code: number;
		description: string;
	};
};

// TODO clear up the differences between 401 and 403
export const errorCodes: ErrorCodesMap = {
	FORBIDDEN_USERNAME: {
		code: 400,
		description: "You cannot use that username",
	},
	INVALID_CREDENTIALS: {
		code: 401,
		description: "Invalid Username or Password",
	},
	FORBIDDEN: {
		code: 403,
		description: "Forbidden",
	},
	UNAUTHORIZED: {
		code: 401,
		description: "Unauthorized",
	},
	UNKNOWN_ERROR: {
		code: 500,
		description: "Internal server error",
	},
	NOT_FOUND: {
		code: 404,
		description: "Not found",
	},
	MISSING_PARAMETERS: {
		code: 400,
		description: "Missing parameter",
	},
	MISSING_BODY: {
		code: 400,
		description: "Missing body",
	},
	NAME_ALREADY_EXISTS: {
		code: 400,
		description: "Streamer with this name already exists",
	},
	ALREADY_VOTED: {
		code: 400,
		description: "You have already voted",
	},
	PLATFORM_NOT_ALLOWED: {
		code: 400,
		description: "Chosen platform is not allowed",
	},
};
