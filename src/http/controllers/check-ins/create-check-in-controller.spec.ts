import app from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("CreateCheckInController E2E Test", async () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("Should be able to create a check in", async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "Javascript gym",
                latitude: -23.5505199,
                longitude: -46.6333094,
                
            }
        })

        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            userLatitude: -23.5505199,
            userLongitude: -46.6333094
        })

        expect(response.statusCode).toBe(201)
    })
})