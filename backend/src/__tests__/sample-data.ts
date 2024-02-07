import { Platform, Streamer, User } from "@prisma/client";

export const user101: User = {
	id: "4b451aae-a594-41aa-b41f-3939ef0aceda",
	username: "user101",
	password: "user101",
};

export const streamer101: Streamer = {
	id: "e0ade5cb-a933-45dd-8828-04fb933b395f",
	name: "streamer101",
	description: "lorem impsum",
	platformId: "ead18de8-1ec5-4e3f-8c70-1d8de1b43ef8",
	uploaded_by: user101.id,
};

export const platforms101: Platform[] = [
	{
		id: "7df30f1e-0652-4826-98cc-a45c71b4edcd",
		type: "Twitch",
	},
	{
		id: "f0c8cfbf-ed8d-4e2a-bc6e-829dc0d67cc6",
		type: "YouTube",
	},
	{
		id: "3ad4090f-6d18-410d-a626-6e6d98405537",
		type: "Rumble",
	},
	{
		id: "e5a5a322-2f0a-46bb-affc-aa3d5a68de73",
		type: "TikTok",
	},
	{
		id: "c0cd5b2c-8226-4c4c-8588-2ed510c6d9c8",
		type: "Kick",
	},
];
