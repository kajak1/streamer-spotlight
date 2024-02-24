import { z } from "zod";

export const voteTypeSchema = z.object({
	voteType: z.union([z.literal("upvote"), z.literal("downvote")]),
	operation: z.union([z.literal("add"), z.literal("remove")]),
});

export type VoteTypeBody = z.infer<typeof voteTypeSchema>;

export const GetSpecificParamsSchema = z.object({
	streamerId: z.string(),
});

export type GetSpecificParams = z.infer<typeof GetSpecificParamsSchema>;

export const VoteParamsSchema = GetSpecificParamsSchema;

export type VoteParams = z.infer<typeof VoteParamsSchema>;

export const UploadBodySchema = z.object({
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

export type UploadBody = z.infer<typeof UploadBodySchema>;
