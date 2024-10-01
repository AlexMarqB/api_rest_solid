import app from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("GetUserMetricsController E2E Test", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("Should be able to get the metrics from an user", async () => {
		const { token } = await createAndAuthenticateUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: "Javascript gym",
				latitude: -23.5505199,
				longitude: -46.6333094,
			},
		});

		const checkIns = await prisma.checkIn.createMany({
			data: [
				{
					user_id: user.id,
					gym_id: gym.id,
				},
				{
					user_id: user.id,
					gym_id: gym.id,
				},
			],
		});

		const response = await request(app.server)
			.get("/check-ins/metrics")
			.set("Authorization", `Bearer ${token}`)
			.send({
				userId: user.id,
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.checkInsCount).toEqual(2);
	});
});
