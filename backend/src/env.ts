import z from "zod";

const envVariables = z.object({
	DATABASE_URL: z.string(),
	PORT: z.coerce.number(),
	REDIS_URL: z.string()
});

export const env = envVariables.parse(process.env);
