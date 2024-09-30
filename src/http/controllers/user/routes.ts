import { authenticateUserController } from "@/http/controllers/user/authenticate-user-controller";
import { createUserController } from "@/http/controllers/user/create-user-controller";
import { getUserProfileController } from "@/http/controllers/user/get-user-profile-controller";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', createUserController)
    app.post('/sessions', authenticateUserController)
    
    /** Authenticated **/
    app.get('/me', {onRequest: [verifyJwt]}, getUserProfileController)
}