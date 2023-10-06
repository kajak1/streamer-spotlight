import { z } from "zod";

export type GetAllResponse = Streamer;

export const voteTypeSchema = z.object({
	voteType: z.union([z.literal("upvote"), z.literal("downvote")]),
	operation: z.union([z.literal("add"), z.literal("remove")]),
});

export type VoteTypeBody = z.infer<typeof voteTypeSchema>;

export const StreamerSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().nullable(),
	platformId: z.string(),
});

export type Streamer = z.infer<typeof StreamerSchema>;

export const StreamerFormSchema = z.object({
	name: z.string().trim().nonempty("Name cannot be empty"),
	platform: z.union([
		z.literal("Twitch"),
		z.literal("Kick"),
		z.literal("YouTube"),
		z.literal("TikTok"),
		z.literal("Rumble"),
	]),
	description: z.string().trim().nullable(),
});

export type StreamerForm = z.infer<typeof StreamerFormSchema>;
