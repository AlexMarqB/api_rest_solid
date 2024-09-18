import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/user/prisma-repository"
import bcrypt from "bcryptjs"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

export async function createUserUseCase({name, email, password}: CreateUserUseCaseRequest) {
    const prismaUserRepository = new PrismaUserRepository()

    const password_hash = await bcrypt.hash(password, 6)  //o valor mais utilizado são de 6 rounds

    const userWithSameEmail = await prismaUserRepository.findByEmail(email)

    if (userWithSameEmail) {
        throw new Error("User with same email already exists")
    }

    prismaUserRepository.create({
        name,
        email,
        password_hash
    })
}