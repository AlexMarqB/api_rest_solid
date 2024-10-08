import app from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('AuthenticateUserController E2E Test', async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("Should be able to authenticate", async () => {
        await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(authResponse.status).toBe(200)
        expect(authResponse.body).toEqual({
            token: expect.any(String),
        })
    })
})