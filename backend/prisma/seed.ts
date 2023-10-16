import { PrismaClient } from "@prisma/client";
import { platforms101 } from "../src/__tests__/sample-data";
import { env } from "../src/env";

const prisma = new PrismaClient();

async function main() {
	const environment = env.NODE_ENV;

	switch (environment) {
		case "development": {
			const platforms = platforms101.map((platform) => {
				return prisma.platform.create({
					data: { ...platform },
				});
			});

			const user = prisma.user.create({
				data: { username: "admin", password: "admin" },
			});

			await prisma.$transaction([...platforms, user]);

			break;
		}
		default: {
			const platforms = platforms101.map((platform) => {
				return prisma.platform.create({
					data: { ...platform },
				});
			});

			await prisma.$transaction([...platforms]);
		}
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
