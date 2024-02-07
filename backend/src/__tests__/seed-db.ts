import { PrismaClient } from "@prisma/client";
import { platforms101, user101 } from "./sample-data";
import { env } from "../env";

const prisma = new PrismaClient();

function seeder() {
	const environment = env.NODE_ENV;

	switch (environment) {
		case "development": {
			const platforms = platforms101.map((platform) => {
				return prisma.platform.create({
					data: platform,
				});
			});

			const user = prisma.user.create({
				data: user101,
			});

			return prisma.$transaction([...platforms, user]);
		}
		default: {
			const platforms = platforms101.map((platform) => {
				return prisma.platform.create({
					data: { ...platform },
				});
			});

			return prisma.$transaction([...platforms]);
		}
	}
}

export async function seedDb() {
	return seeder()
		.then(() => prisma.$disconnect())
		.catch((e) => {
			console.error(e);
			prisma.$disconnect();
		});
}