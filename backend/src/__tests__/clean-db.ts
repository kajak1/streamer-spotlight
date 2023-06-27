// src/tests/helpers/reset-db.ts
import { PrismaClient } from "@prisma/client";
import { user101 } from "./sample-data";

const prisma = new PrismaClient();

export default async () => {
	await prisma.$transaction([
		prisma.streamer.delete({
			where: {
				id: user101.id,
			},
		}),
	]);
};
