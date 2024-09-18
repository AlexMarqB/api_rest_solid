import bcrypt from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

export async function createUserController(req: FastifyRequest, rep: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(req.body)

    const password_hash = await bcrypt.hash(password, 6)  //o valor mais utilizado são de 6 rounds

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        return rep.status(409).send("User already exists")
    }

    await prisma.user.create({
        data: {
            name, 
            email,
            password_hash
        }
    })

    return rep.status(201).send()
}