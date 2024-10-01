import app from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("CreateGymController E2E Test", async () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("Should be able to create a gym", async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
        .post('/gyms')
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Academia do Zé",
            description: "Academia do Zé, a melhor academia do Brasil",
            latitude: -23.5505199,
            longitude: -46.6333094,
            phone: "11999999999"
        })

        expect(response.statusCode).toBe(201)
    })
})