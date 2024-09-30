import { makeGetGymsUseCase } from "@/use-cases/@factories/make-gym-usecases";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getGymsController(req: FastifyRequest, rep: FastifyReply) {

    const searchParamsSchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const {query, page} = searchParamsSchema.parse(req.query)

    const getGymsUseCase = makeGetGymsUseCase()
    
    const gyms = await getGymsUseCase.execute({query, page})

    return rep.status(200).send(gyms)
}