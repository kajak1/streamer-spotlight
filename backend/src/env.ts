import z from "zod";

const envVariables = z.object({
	DATABASE_URL: z.string(),
	PORT: z.coerce.number(),
});

export const env = envVariables.parse(process.env);
