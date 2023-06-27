import { beforeEach, describe } from "mocha";
import supertest from "supertest";
import cleanDb from "./clean-db";
import seedDb from "./seed-db";
import { expect } from "chai";

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

	describe("GET /streamers", () => {
		it("get all streamers THEN res code 200", async () => {
			const { statusCode, body } = await host.get("/streamers");
			console.log(statusCode, body);
			expect(statusCode).to.equal(200);
		});
	});

	describe("GET /streamers/:streamerId", () => {
		it("get all streamers THEN res code 200", async () => {
			await host.get("/streamers/:streamerId").expect(200);
		});
	});

	describe("POST /streamers", () => {
		it("get all streamers THEN res code 200", async () => {
			await host.post("/streamers").expect(200);
		});
	});

	describe("PUT /streamers/:streamerId/vote", () => {
		it("get all streamers THEN res code 200", async () => {
			await host.put("/streamers/:streamerId/vote").expect(200);
		});
	});
});
