import { z } from "zod";

export interface Streamer {
	id: string;
	name: string;
	description: string;
	platform: string;
	upvotes: number;
	downvotes: number;
}

export const VoteSchema = z.union([z.literal("upvote"), z.literal("downvote")]);

export type Vote = z.infer<typeof VoteSchema>;

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
