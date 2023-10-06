import { Streamer, Platform } from "@prisma/client";

export const user101: Streamer = {
	id: "3b40824d-a3b6-44d9-95a1-5f21ebcf9101",
	name: "user101",
	description: "lorem impsum",
	platformId: "ead18de8-1ec5-4e3f-8c70-1d8de1b43ef8",
};

export const platforms101: Platform[] = [
	{
		id: "ead18de8-1ec5-4e3f-8c70-1d8de1b43ef8",
		type: "Twitch",
	},
	{
		id: "9203d9b5-0e95-4ace-8fc2-b0d9da0c3023",
		type: "YouTube",
	},
	{
		id: "c18cbf47-c0e7-459f-959d-fced8532efcb",
		type: "Rumble",
	},
	{
		id: "fa813a2f-80c2-4ebe-b46b-6f86b3615b6b",
		type: "TikTok",
	},
	{
		id: "0c263310-0528-41c4-aeae-7d366887e6ad",
		type: "Kick",
	},
];
