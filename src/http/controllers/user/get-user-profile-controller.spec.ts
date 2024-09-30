import app from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("GetUserProfileController E2E Test", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("Should be able to get user profile", async () => {
		const { token } = await createAndAuthenticateUser(app)

		const profileResponse = await request(app.server)
			.get("/me")
			.set("Authorization", `Bearer ${token}`);

		expect(profileResponse.status).toBe(200);
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				name: "John Doe",
				email: "johndoe@example.com",
			})
		);
	});
});
