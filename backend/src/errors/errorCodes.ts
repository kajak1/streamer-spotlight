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
		message: string;
	};
};

// TODO clear up the differences between 401 and 403
export const errorCodes: ErrorCodesMap = {
	FORBIDDEN_USERNAME: {
		code: 400,
		message: "You cannot use that username",
	},
	INVALID_CREDENTIALS: {
		code: 400,
		message: "Invalid Username or Password",
	},
	FORBIDDEN: {
		code: 403,
		message: "Forbidden",
	},
	UNAUTHORIZED: {
		code: 401,
		message: "Unauthorized",
	},
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
