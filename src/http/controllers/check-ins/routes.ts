import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { createCheckInController } from "./create-check-in-controller";
import { validateCheckInController } from "./validate-check-in-controller";
import { getUserCheckInsHistoryController } from "./get-user-check-ins-history-controller";
import { getUserMetricsController } from "./get-user-metrics-controller";

export async function checkInSRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt); // verifica todas as rotas deste arquivo

    app.post('/gyms/:gymId/check-ins', createCheckInController)

    app.get('/check-ins/history', getUserCheckInsHistoryController)

    app.get('/check-ins/metrics', getUserMetricsController) 

    app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}