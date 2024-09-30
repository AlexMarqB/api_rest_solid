import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createGymController } from "./create-gym-controller";
import { getGymsController } from "./get-gyms-controller";
import { getNearbyGymsController } from "./get-nearby-gyms-controller";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt); // verifica todas as rotas deste arquivo

    app.post('/gyms', createGymController)

    app.get('/gyms/search', getGymsController)

    app.get('/gyms/nearby', getNearbyGymsController)
    
}