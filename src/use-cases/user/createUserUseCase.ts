import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

export async function createUserUseCase({name, email, password}: CreateUserUseCaseRequest) {
    const password_hash = await bcrypt.hash(password, 6)  //o valor mais utilizado são de 6 rounds

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error("User with same email already exists")
    }

    await prisma.user.create({
        data: {
            name, 
            email,
            password_hash
        }
    })
}