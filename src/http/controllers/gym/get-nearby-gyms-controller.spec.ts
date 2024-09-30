import app from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("GetNearbyGymsController E2E Test", async () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("Should be able to get nearby gyms", async () => {
        const myLocation = {
            longitude: -20.5362031,
            latitude: -47.394482
        }

        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
        .post('/gyms')
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: 'Near Gym',
            description: null,
            phone: null,
            longitude: -20.5362031,
            latitude: -47.394482
        })

        await request(app.server)
        .post('/gyms')
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -20.7355202,
            longitude: -46.5973104
        })

        const response = await request(app.server)
        .get('/gyms/nearby')
        .set("Authorization", `Bearer ${token}`)
        .query({
            longitude: -20.5362031,
            latitude: -47.394482
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Near Gym"
            })
        ])
    })
})