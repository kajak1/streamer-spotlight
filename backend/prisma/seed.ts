import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { platforms101, user101 } from "../src/__tests__/sample-data";
import { env } from "../src/env";

const prisma = new PrismaClient();

async function main() {
	const environment = env.NODE_ENV;

	switch (environment) {
		case "development": {
			const platforms = platforms101.map((platform) => {
				return prisma.platform.create({
					data: platform,
				});
			});

			const hash = await argon2.hash(user101.password, {
				type: argon2.argon2id,
			});

			const user = prisma.user.create({
				data: { ...user101, password: hash },
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
