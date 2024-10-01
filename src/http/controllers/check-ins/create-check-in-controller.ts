import { UserAlreadyExistsError } from "@/use-cases/@errors/user-already-exists-error"
import { makeCreateCheckInUseCase } from "@/use-cases/@factories/make-check-in-usecases"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createCheckInController(req: FastifyRequest, rep: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInSchema = z.object({
        userLatitude: z.coerce.number().refine((val) => Math.abs(val) <= 90),
        userLongitude: z.coerce.number().refine((val) => Math.abs(val) <= 180),
    })

    const { userLatitude, userLongitude} = createCheckInSchema.parse(req.body)
    const { gymId } = createCheckInParamsSchema.parse(req.params)

    const createCheckInUseCase = makeCreateCheckInUseCase()

    await createCheckInUseCase.execute({ gymId, userId: req.user.sub, userLatitude, userLongitude })

    return rep.status(201).send()
}