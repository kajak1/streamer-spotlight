import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleaner() {
	return prisma.$transaction([
		prisma.upvote.deleteMany({}),
		prisma.downvote.deleteMany({}),
		prisma.user.deleteMany({}),
		prisma.streamer.deleteMany({}),
		prisma.platform.deleteMany({}),
	]);
}

export async function cleanDb() {
	return cleaner()
		.then(() => prisma.$disconnect())
		.catch((e) => {
			console.error(e);
			prisma.$disconnect();
		});
}