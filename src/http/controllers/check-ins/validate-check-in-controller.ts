import { UserAlreadyExistsError } from "@/use-cases/@errors/user-already-exists-error"
import { makeCreateCheckInUseCase, makeValidateCheckInUseCase } from "@/use-cases/@factories/make-check-in-usecases"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function validateCheckInController(req: FastifyRequest, rep: FastifyReply) {
    const validadeCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validadeCheckInParamsSchema.parse(req.params)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({ checkInId })

    return rep.status(204).send()
}