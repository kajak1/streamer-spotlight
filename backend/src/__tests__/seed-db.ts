import { PrismaClient } from "@prisma/client";
import { platforms101, user101 } from "./sample-data";

const prisma = new PrismaClient();

export default async () => {
	const foundStreamer = await prisma.streamer.findUnique({
		where: { id: user101.id },
	});

	const doesStreamerExist = foundStreamer !== null;

	if (doesStreamerExist) return;

	for (const platform of platforms101) {
		await prisma.platform.create({
			data: { ...platform },
		});
	}

	await prisma.streamer.create({
		data: { ...user101 },
	});
};
