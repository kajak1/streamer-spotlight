import { PrismaClient } from "@prisma/client";
import { user101 } from "./sample-data";

const prisma = new PrismaClient();

export default async () => {
	const foundStreamer = await prisma.streamer.findUnique({
		where: { id: user101.id },
	});

	const doesStreamerExist = foundStreamer !== null;

	if (doesStreamerExist) return;

	await prisma.streamer.create({
		data: { ...user101 },
	});
};
