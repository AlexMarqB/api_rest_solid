import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { CreateUserUseCase } from "@/use-cases/user/create-user-usecase"
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
        const prismaUsersRepository = new PrismaUsersRepository()
        const createUserUseCase = new CreateUserUseCase(prismaUsersRepository)

        await createUserUseCase.execute({ name, email, password })
    } catch (error) {
        if(error instanceof UserAlreadyExistsError) {
            return rep.status(409).send({ message: error.message })
        }

        return rep.status(500).send() // TODO: fix me
    }

    return rep.status(201).send()
}