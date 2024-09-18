
import { createUserController } from "@/http/controllers/user/createUserController";
import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', createUserController)
}