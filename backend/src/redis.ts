import { createClient } from "redis";
import { logger } from "./logger";
import { env } from "./env";

type RedisClient = ReturnType<typeof createClient>;
export let client: RedisClient | null = null;

export function initRedisClient(): void {
	client = createClient({
		url: `redis://${env.REDIS_URL}`,
	});

	client.on("error", (err) => console.log("Redis Client Error", err));

	client.connect().then((res) => {
		logger.info("Redis successfully connected");
	});
}

function createRedisClient(): RedisClient {
	client = createClient({
		url: `redis://${env.REDIS_URL}`,
	});

	client.on("error", (err) => console.log("Redis Client Error", err));

	client.connect().then(() => {
		logger.info("Redis successfully connected");
	});

	return client;
}

export function getRedisClient(): RedisClient {
	if (client === null) return createRedisClient();
	return client;
}
