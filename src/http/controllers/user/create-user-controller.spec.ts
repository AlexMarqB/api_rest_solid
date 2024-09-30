import app from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('CreateUserController E2E Test', async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("Should create a new user", async () => {
        const response = await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(response.status).toEqual(201)
    })
})