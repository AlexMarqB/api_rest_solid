import app from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('RefreshTokenController E2E Test', async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("Should be able to refresh a token", async () => {
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

        const cookies = authResponse.get('Set-Cookie') // get the cookies from the response pelo header 'Set-Cookie'

        expect(cookies).toBeDefined()

        const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies as string[]) // set the cookies in the request header
        .send()

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
        expect(response.get('Set-Cookie')).toEqual(
            [expect.stringContaining('refreshToken')]
        )
    })
})