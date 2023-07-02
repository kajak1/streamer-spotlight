import { Streamer } from "@prisma/client";
import { expect } from "chai";
import { beforeEach, describe } from "mocha";
import supertest from "supertest";
import cleanDb from "./clean-db";
import { user101 } from "./sample-data";
import seedDb from "./seed-db";

describe("Streamers", () => {
	let host: ReturnType<typeof supertest>;

	beforeEach(async () => {
		host = supertest("http://localhost:3001");
		await seedDb();
	});

	afterEach(async () => {
		await cleanDb();
	});

	describe("GET /streamers", () => {
		it("WHEN database is empty and THEN res code 404", async () => {
			await cleanDb();

			const { statusCode } = await host.get("/streamers");

			expect(statusCode).to.equal(404);
		});

		it("WHEN database is not empty and THEN res code 200", async () => {
			await seedDb();

			const { statusCode } = await host.get("/streamers");

			expect(statusCode).to.equal(200);
		});
	});

	describe("GET /streamers/:streamerId", () => {
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

	describe("POST /streamers", () => {
		it("WHEN posted a streamer THEN res code 200", async () => {
			const newUser: Streamer = {
				...user101,
				id: "3b40824d-a3b6-44d9-95a1-5f21eb101101",
				name: "user101101",
			};

			const { statusCode } = await host.post("/streamers").send(newUser);

			expect(statusCode).to.equal(200);

			await cleanDb();
		});

		it("WHEN streamer with this name already exists THEN res code 500 ", async () => {
			await seedDb();
			const newUser: Streamer = {
				...user101,
			};

			const { statusCode } = await host.post("/streamers").send(newUser);

			expect(statusCode).to.equal(500);

			await cleanDb();
		});
	});

	describe("PUT /streamers/:streamerId/vote", () => {
		it("WHEN upvote THEN increase upvote count by 1", async () => {
			await seedDb();

			const voteType = "upvote";
			const { statusCode: statusCodePut } = await host
				.put(`/streamers/${user101.id}/vote`)
				.send({ voteType });

			const { statusCode: statusCodeGet, body } = await host.get(
				`/streamers/${user101.id}`
			);

			expect(body.streamer!.upvotes!).to.equal(1);
			expect(statusCodePut).to.be.equal(200);
			expect(statusCodeGet).to.be.equal(200);
		});
	});
});
