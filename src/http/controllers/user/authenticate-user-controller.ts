import { makeAuthenticateUserUseCase } from "@/use-cases/@factories/make-authenticate-usecases"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticateUserController(req: FastifyRequest, rep: FastifyReply) {
    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateUserSchema.parse(req.body)

    try {
        const authUserUseCase = makeAuthenticateUserUseCase()

        await authUserUseCase.execute({ email, password })
    } catch (error) {

        throw error
    }

    return rep.status(200).send()
}