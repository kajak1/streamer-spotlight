import z from "zod";

export const StreamerFormData = z.object({
	name: z.string(),
	description: z.string(),
	platform: z.string(),
});

export type StreamerFormData = z.infer<typeof StreamerFormData>;
