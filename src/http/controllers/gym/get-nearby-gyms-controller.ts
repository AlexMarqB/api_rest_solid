import { makeGetNearbyGymsUseCase } from "@/use-cases/@factories/make-gym-usecases";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getNearbyGymsController(req: FastifyRequest, rep: FastifyReply) {

    const searchParamsSchema = z.object({
        latitude: z.coerce.number().refine(value => Math.abs(value) <= 90),
        longitude: z.coerce.number().refine(value => Math.abs(value) <= 180),
    })

    const {latitude, longitude} = searchParamsSchema.parse(req.query)

    const getNearbyGymsUseCase = makeGetNearbyGymsUseCase()
    
    const gyms = await getNearbyGymsUseCase.execute({userLatitude: latitude, userLongitude: longitude})

    return rep.status(200).send(gyms)
}