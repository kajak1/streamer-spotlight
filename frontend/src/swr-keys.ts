export const SWR_KEYS = {
	GET_ALL: "GET_ALL",
	GET_SPECIFIC: (id: string) => `GET_SPECIFIC/${id}`,
} as const;
