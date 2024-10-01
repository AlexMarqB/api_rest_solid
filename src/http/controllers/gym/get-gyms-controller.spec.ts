import app from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("GetGymsController E2E Test", async () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("Should be able to get gyms", async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .post('/gyms')
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Javascript Gym",
            description: "Descrição",
            latitude: -23.5505199,
            longitude: -46.6333094,
            phone: "11999999999"
        })

        await request(app.server)
        .post('/gyms')
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Typescript Gym",
            description: "Descrição",
            latitude: -23.5505199,
            longitude: -46.6333094,
            phone: "11999999999"
        })

        const response = await request(app.server)
        .get('/gyms/search')
        .set("Authorization", `Bearer ${token}`)
        .query({
            query: "Javascript"
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Javascript Gym"
            })
        ])
    })
})