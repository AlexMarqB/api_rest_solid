import { makeCreateUserUseCase } from "@/use-cases/factories/make-createuser-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createUserController(req: FastifyRequest, rep: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(req.body)

    try {
        const createUserUseCase = makeCreateUserUseCase()

        await createUserUseCase.execute({ name, email, password })
    } catch (error) {

        throw error
    }

    return rep.status(201).send()
}