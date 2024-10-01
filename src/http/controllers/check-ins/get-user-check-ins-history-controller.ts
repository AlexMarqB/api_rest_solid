
import { makeGetUserCheckInHistoryUseCase } from "@/use-cases/@factories/make-check-in-usecases";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserCheckInsHistoryController(req: FastifyRequest, rep: FastifyReply) {

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(req.query)

    const getUserCheckInsHistoryUseCase = makeGetUserCheckInHistoryUseCase()
    
    const gyms = await getUserCheckInsHistoryUseCase.execute({userId: req.user.sub, page})

    return rep.status(200).send(gyms)
}