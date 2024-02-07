import { Streamer } from "@prisma/client";
import { expect } from "chai";
import { describe } from "mocha";
import supertest from "supertest";
import z from "zod";
import { StreamerSchema } from "../../prisma/generated/zod-typings";
import { env } from "../env";
import { VoteTypeBody } from "../shared.types";
import { cleanDb } from "./clean-db";
import { streamer101 } from "./sample-data";
import { seedDb } from "./seed-db";

describe("Streamers", () => {
	let host: ReturnType<typeof supertest>;

	before(async () => {
		host = supertest(`http://localhost:${env.PORT}`);
		await cleanDb();
	});

	describe("[GET] /streamers", () => {
		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN database is empty THEN res code 404", async () => {
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
		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN streamer is present THEN res code 200", async () => {
			await seedDb();
			const { statusCode } = await host.get(`/streamers/${streamer101.id}`);

			expect(statusCode).to.equal(200);
		});

		it("WHEN streamer is not present THEN res code 404", async () => {
			const { statusCode } = await host.get(`/streamers/${streamer101.id}`);

			expect(statusCode).to.equal(404);
		});
	});

	describe("[POST] /streamers", () => {
		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN posted a streamer THEN res code 200", async () => {
			const newUser = {
				name: "user101101",
				description: "user101101_description",
				platform: "Twitch",
			};

			const { statusCode } = await host.post("/streamers").send(newUser);

			expect(statusCode).to.equal(200);
		});

		it("WHEN streamer with this name already exists THEN res code 400 ", async () => {
			await seedDb();
			
			const newUser: Streamer = streamer101;
			const { statusCode } = await host.post("/streamers").send(newUser);

			expect(statusCode).to.equal(400);
		});
	});

	describe("[PUT] /streamers/:streamerId/vote", () => {
		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN upvote THEN increase upvote count by 1", async () => {
			await seedDb();

			const addUpvoteBody: VoteTypeBody = { voteType: "upvote", operation: "add" };

			const { statusCode: statusCode_PUT } = await host.put(`/streamers/${streamer101.id}/vote`).send(addUpvoteBody);

			const { statusCode: statusCode_GET, body } = await host.get(`/streamers/${streamer101.id}`);

			const responseBodySchema = StreamerSchema.extend({
				_count: z.object({
					Downvote: z.number(),
					Upvote: z.number(),
				}),
			});

			const parseResult = responseBodySchema.safeParse(body);

			expect(parseResult.success).to.equal(true);
			if (parseResult.success) {
				expect(parseResult.data._count.Upvote).to.equal(1);
			}
			expect(statusCode_PUT).to.equal(200);
			expect(statusCode_GET).to.equal(200);
		});

		it("WHEN upvote THEN remove downvote", async () => {
			await seedDb();

			const addDownvote: VoteTypeBody = {
				voteType: "downvote",
				operation: "add",
			};

			const { statusCode: addDownvoteCode } = await host.put(`/streamers/${streamer101.id}/vote`).send(addDownvote);

			const { body: streamerWithDownvote } = await host.get(`/streamers/${streamer101.id}`);
			const responseBodySchema_downvote = StreamerSchema.extend({
				_count: z.object({
					Downvote: z.number(),
					Upvote: z.number(),
				}),
			});

			const parseResult_downvote = responseBodySchema_downvote.safeParse(streamerWithDownvote);

			expect(parseResult_downvote.success).to.equal(true);
			if (parseResult_downvote.success) {
				expect(parseResult_downvote.data._count.Downvote).to.equal(1);
				expect(parseResult_downvote.data._count.Upvote).to.equal(0);
			}

			const addUpvote: VoteTypeBody = { voteType: "upvote", operation: "add" };

			const { statusCode: addUpvoteCode } = await host.put(`/streamers/${streamer101.id}/vote`).send(addUpvote);

			const { body: streamerWithUpvote } = await host.get(`/streamers/${streamer101.id}`);
			const responseBodySchema_upvote = StreamerSchema.extend({
				_count: z.object({
					Downvote: z.number(),
					Upvote: z.number(),
				}),
			});

			const parseResult_upvote = responseBodySchema_upvote.safeParse(streamerWithUpvote);

			expect(parseResult_upvote.success).to.equal(true);
			if (parseResult_upvote.success) {
				expect(parseResult_upvote.data._count.Downvote).to.equal(0);
				expect(parseResult_upvote.data._count.Upvote).to.equal(1);
			}

			expect(addDownvoteCode).to.equal(200);
			expect(addUpvoteCode).to.equal(200);
		});
	});
});
