import { PrismaClient } from "@prisma/client";
import { platforms101, user101 } from "./sample-data";
import { env } from "../env";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function seeder() {
	const environment = env.NODE_ENV;

	switch (environment) {
		case "development": {
			const platforms = platforms101.map((platform) => {
				return prisma.platform.create({
					data: platform,
				});
			});

			const passwordHash = await argon2.hash(user101.password, {
				type: argon2.argon2id,
			});

			const user = prisma.user.create({
				data: { ...user101, password: passwordHash },
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
