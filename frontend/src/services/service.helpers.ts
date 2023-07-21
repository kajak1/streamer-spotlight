export interface ErrorResponse {
	error: { message: string };
}

export function isErrorResponse(e: unknown): e is ErrorResponse {
	return (
		(e as ErrorResponse).error !== undefined &&
		(e as ErrorResponse).error.message !== undefined
	);
}
