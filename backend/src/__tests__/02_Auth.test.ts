import supertest from "supertest";
import { env } from "../env";
import { cleanDb } from "./clean-db";
import { seedDb } from "./seed-db";
import { user101 } from "./sample-data";
import { LoginBody } from "../repositories/auth.repository";
import { expect } from "chai";
import { SerializedErrorSchema } from "../errors/CustomError";

describe("Auth", () => {
	let host: ReturnType<typeof supertest>;

	before(async () => {
		host = supertest(`http://localhost:${env.PORT}`);
		await cleanDb();
	});

	after(() => {
		cleanDb();
	});

	describe("[POST] /auth/login", () => {
		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN incorrect credentials provided THEN res code 401", async () => {
			await seedDb();

			const incorrectCredentials: LoginBody = { username: `X${user101.username}`, password: user101.password };

			const { statusCode, body } = await host.post("/auth/login").send(incorrectCredentials);
			const parsedBody = SerializedErrorSchema.safeParse(JSON.parse(body));

			expect(statusCode).to.equal(401);
			expect(parsedBody.success).to.equal(true);
			if (parsedBody.success) {
				expect(parsedBody.data.error.message).to.equal("INVALID_CREDENTIALS");

				if (parsedBody.data.error.description) {
					expect(parsedBody.data.error.description).to.equal("Invalid Username or Password");
				}
			}
		});

		it("WHEN correct credentials provided THEN res code 200", async () => {
			await seedDb();

			const correctCredentials: LoginBody = {
				username: user101.username,
				password: user101.password,
			};

			const { statusCode, body, headers } = await host.post("/auth/login").send(correctCredentials);

			expect(statusCode).to.equal(200);
			expect(headers).to.haveOwnProperty("set-cookie");

			if ("set-cookie" in headers) {
				const cookie: string = headers["set-cookie"][0];
				const properties = cookie.split(";").map((prop) => prop.trim());

				const key = properties[0]?.split("=")[0];

				expect(key).to.equal("sessionId");
				expect(properties).to.include("Secure", "cookie must have a Secure prop");
				expect(properties).to.include("HttpOnly", "cookie must have a HttpOnly prop");
			}

			expect(body).to.equal("Logged in");
		});

		it("WHEN session exists and cookie is provided THEN log in", async () => {
			await seedDb();

			const correctCredentials: LoginBody = {
				username: user101.username,
				password: user101.password,
			};

			const { statusCode, body, headers } = await host.post("/auth/login").send(correctCredentials);

			expect(statusCode).to.equal(200);
			expect(headers).to.haveOwnProperty("set-cookie");

			if ("set-cookie" in headers) {
				const cookie: string = headers["set-cookie"][0];
				const properties = cookie.split(";").map((prop) => prop.trim());

				const key = properties[0]?.split("=")[0];

				expect(key).to.equal("sessionId");
				expect(properties).to.include("Secure");
				expect(properties).to.include("HttpOnly");
			}

			expect(body).to.equal("Logged in");
		});

	});

	describe("[POST] /auth/register", () => {
		afterEach(async () => {
			await cleanDb();
		});

		it("WHEN correct data provided THEN res code 200", async () => {
			await seedDb();

			const newUser: LoginBody = {
				username: "sample-user",
				password: "sample-user-password",
			};

			const { statusCode, body } = await host.post("/auth/register").send(newUser);

			expect(statusCode).to.equal(200);
			expect(body).to.equal("Registered");
		});

		it("WHEN taken username is provided THEN res code 400", async () => {
			await seedDb();

			const newUser: LoginBody = {
				username: user101.username,
				password: "sample-user-password",
			};

			const { statusCode, body } = await host.post("/auth/register").send(newUser);

			const parsedBody = SerializedErrorSchema.safeParse(JSON.parse(body));

			expect(statusCode).to.equal(400);

			if (parsedBody.success) {
				expect(parsedBody.data.error.message).to.equal("FORBIDDEN_USERNAME");
				if (parsedBody.data.error.description) {
					expect(parsedBody.data.error.description).to.equal("You cannot use that username");
				}
			}
		});
	});
});
