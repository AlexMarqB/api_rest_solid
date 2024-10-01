import { makeGetUserMetricsUseCase } from "@/use-cases/@factories/make-check-in-usecases";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserMetricsController(req: FastifyRequest, rep: FastifyReply) {

    const getUserCheckInsHistoryUseCase = makeGetUserMetricsUseCase()
    
    const checkInsCount = await getUserCheckInsHistoryUseCase.execute({userId: req.user.sub})

    return rep.status(200).send(checkInsCount)
}