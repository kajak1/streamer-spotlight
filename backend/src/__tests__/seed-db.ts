import { PrismaClient } from "@prisma/client";
import { user101 } from "./sample-data";

const prisma = new PrismaClient();

export default async () => {
	await prisma.$transaction([
		prisma.test_Streamer.create({
			data: { ...user101 },
		}),
	]);
};
