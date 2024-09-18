import { createUserUseCase } from "@/use-cases/user/createUserUseCase"
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
        await createUserUseCase({ name, email, password })
    } catch (error) {
        return rep.status(409).send()
    }

    return rep.status(201).send()
}