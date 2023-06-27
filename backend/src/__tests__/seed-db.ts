import { PrismaClient } from "@prisma/client";
import { user101 } from "./sample-data";

const prisma = new PrismaClient();

export default async () => {
	await prisma.$transaction([
		prisma.streamer.create({
			data: { ...user101 },
		}),
	]);
};
