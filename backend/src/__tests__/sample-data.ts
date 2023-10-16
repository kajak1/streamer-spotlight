import { Prisma } from "@prisma/client";

export const streamer101: Prisma.StreamerUncheckedCreateInput = {
	name: "streamer101",
	description: "lorem impsum",
	platformId: "ead18de8-1ec5-4e3f-8c70-1d8de1b43ef8",
};

export const platforms101: Prisma.PlatformUncheckedCreateInput[] = [
	{
		type: "Twitch",
	},
	{
		type: "YouTube",
	},
	{
		type: "Rumble",
	},
	{
		type: "TikTok",
	},
	{
		type: "Kick",
	},
];
