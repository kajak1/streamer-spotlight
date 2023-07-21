// import { Streamer } from "@prisma/client";
// import { expect } from "chai";
// import { beforeEach, describe } from "mocha";
// import supertest from "supertest";
// import cleanDb from "./clean-db";
// import { user101 } from "./sample-data";
// import seedDb from "./seed-db";
// import Sinon from "sinon";

// describe("Streamers", () => {
// 	let host: ReturnType<typeof supertest>;

// 	before(async () => {
// 		host = supertest("http://localhost:3001");
// 	});

// 	describe("GET /streamers", () => {
// 		const sandbox = Sinon.createSandbox();

// 		it("WHEN database is not empty and THEN res code 200", async () => {
// 			await seedDb();

// 			const { statusCode } = await host.get("/streamers");

// 			expect(statusCode).to.equal(200);
// 		});
// 	});
// });
