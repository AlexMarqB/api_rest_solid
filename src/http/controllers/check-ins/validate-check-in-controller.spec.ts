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

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: "Javascript gym",
                latitude: -23.5505199,
                longitude: -46.6333094,
                
            }
        })

        const checkIn = await prisma.checkIn.create({
            data: {
                user_id: user.id,
                gym_id: gym.id
            }
        })

        const response = await request(app.server)
        .patch(`/check-ins/${checkIn.id}/validate`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            userLatitude: -23.5505199,
            userLongitude: -46.6333094
        })

        expect(response.statusCode).toBe(204)
    })
})