import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async () => {
	await prisma.$transaction([
		prisma.upvote.deleteMany({}),
		prisma.downvote.deleteMany({}),
		prisma.user.deleteMany({}),
		prisma.streamer.deleteMany({}),
		prisma.platform.deleteMany({}),
	]);
};
