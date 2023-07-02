import { z } from "zod";

export const voteTypeSchema = z.object({
	voteType: z.union([z.literal("upvote"), z.literal("downvote")]),
});

export type VoteTypeBody = z.infer<typeof voteTypeSchema>;

export const streamerIdSchema = z.object({
	streamerId: z.string(),
});

export type StreamerIdParam = z.infer<typeof streamerIdSchema>;

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
