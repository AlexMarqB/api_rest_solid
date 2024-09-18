import { UsersRepository } from "@/repositories/users-repository"
import bcrypt from "bcryptjs"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({name, email, password}: CreateUserUseCaseRequest) {
        const password_hash = await bcrypt.hash(password, 6)  //o valor mais utilizado são de 6 rounds

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error("User with same email already exists")
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}