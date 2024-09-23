import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUserUseCase } from "@/use-cases/auth/authenticate-user-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticateUserController(req: FastifyRequest, rep: FastifyReply) {
    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateUserSchema.parse(req.body)

    try {
        const usersRepository = new PrismaUsersRepository()
        const authUserUseCase = new AuthenticateUserUseCase(usersRepository)

        await authUserUseCase.execute({ email, password })
    } catch (error) {

        throw error
    }

    return rep.status(200).send()
}