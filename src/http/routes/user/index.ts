
import { authenticateUserController } from "@/http/controllers/auth/authenticate-user-controller";
import { createUserController } from "@/http/controllers/user/create-user-controller";
import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', createUserController)
    app.post('/sessions', authenticateUserController)
}