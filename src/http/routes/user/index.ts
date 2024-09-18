
import { createUserController } from "@/http/controllers/user/create-user-controller";
import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', createUserController)
}