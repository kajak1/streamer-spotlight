import { Streamer } from "@prisma/client";
import { expect } from "chai";
import { beforeEach, describe } from "mocha";
import supertest from "supertest";
import cleanDb from "./clean-db";
import { user101 } from "./sample-data";
import seedDb from "./seed-db";
import { VoteTypeBody } from "../shared.types";
import { StreamerSchema } from "../../prisma/generated/zod";

describe("Streamers", () => {
	let host: ReturnType<typeof supertest>;

	before(async () => {
		host = supertest("http://localhost:3001");
	});

	beforeEach(async () => {
		await seedDb();
	});

	afterEach(async () => {
		await cleanDb();
	});

	describe("[GET] /streamers", () => {
		beforeEach(async () => {
			await seedDb();
		});

		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN database is empty THEN res code 404", async () => {
			await cleanDb();

			const { statusCode } = await host.get("/streamers");

			expect(statusCode).to.equal(404);
		});

		it("WHEN database is not empty THEN res code 200", async () => {
			await seedDb();

			const { statusCode } = await host.get("/streamers");

			expect(statusCode).to.equal(200);
		});
	});

	describe("[GET] /streamers/:streamerId", () => {
		beforeEach(async () => {
			await seedDb();
		});

		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN streamer is present THEN res code 200", async () => {
			await seedDb();

			const { statusCode } = await host.get(`/streamers/${user101.id}`);

			expect(statusCode).to.equal(200);
		});

		it("WHEN streamer is not present THEN res code 404", async () => {
			await cleanDb();

			const { statusCode } = await host.get(`/streamers/${user101.id}`);

			expect(statusCode).to.equal(404);
		});
	});

	describe("[POST] /streamers", () => {
		beforeEach(async () => {
			await seedDb();
		});

		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN posted a streamer THEN res code 200", async () => {
			const newUser: Streamer = {
				...user101,
				id: "3b40824d-a3b6-44d9-95a1-5f21eb101101",
				name: "user101101",
			};

			const { statusCode } = await host.post("/streamers").send(newUser);

			expect(statusCode).to.equal(200);
		});

		it("WHEN streamer with this name already exists THEN res code 400 ", async () => {
			await seedDb();

			const newUser: Streamer = {
				...user101,
			};

			const { statusCode } = await host.post("/streamers").send(newUser);

			expect(statusCode).to.equal(400);
		});
	});

	describe("[PUT] /streamers/:streamerId/vote", () => {
		beforeEach(async () => {
			await seedDb();
		});

		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN upvote THEN increase upvote count by 1", async () => {
			await seedDb();

			const voteType: VoteTypeBody = { voteType: "upvote" };
			const { statusCode: statusCode_PUT } = await host
				.put(`/streamers/${user101.id}/vote`)
				.send(voteType);

			const { statusCode: statusCode_GET, body } = await host.get(
				`/streamers/${user101.id}`
			);

			const parseResult = StreamerSchema.safeParse(body);

			expect(parseResult.success).to.equal(true);
			if (parseResult.success) {
				expect(parseResult.data.upvotes).to.equal(user101.upvotes + 1);
			}
			expect(statusCode_PUT).to.equal(200);
			expect(statusCode_GET).to.equal(200);
		});
	});
});
