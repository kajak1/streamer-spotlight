import z from "zod";

const envVariables = z.object({
	NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
	NODE_ENV_SUBTYPE: z.union([z.literal("local"), z.literal("docker")]),
	DATABASE_URL: z.string(),
	PORT: z.coerce.number(),
	REDIS_URL: z.string(),
	COOKIE_SECRET: z.string(),
});

export const env = envVariables.parse(process.env);
