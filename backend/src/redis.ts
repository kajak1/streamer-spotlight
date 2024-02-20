import { createClient } from "redis";
import { env } from "./env";
import { container } from "tsyringe";
import { Logger } from "winston";

type RedisClient = ReturnType<typeof createClient>;
let client: RedisClient | null = null;

export async function initRedisClient() {
	const logger = container.resolve<Logger>("Logger");

	client = createClient({
		url: `redis://${env.REDIS_URL}`,
	});

	return client
		.connect()
		.then((res) => {
			logger.info("Redis successfully connected");
		})
		.catch((err) => {
			logger.error("Connection to redis failed");
			process.exit(0);
		});
}

export async function getRedisClient(): Promise<RedisClient> {
	if (client === null) {
		await initRedisClient();
	}
	return client as RedisClient;
}
