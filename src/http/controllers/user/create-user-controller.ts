import { UserAlreadyExistsError } from "@/use-cases/@errors/user-already-exists-error"
import { makeCreateUserUseCase } from "@/use-cases/@factories/make-user-usecases"
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

    if(error instanceof UserAlreadyExistsError) {
        return rep.status(409).send({ message: error.message })
    } else {
        throw error
    }

    }

    return rep.status(201).send()
}