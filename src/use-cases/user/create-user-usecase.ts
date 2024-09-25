import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "../@errors/user-already-exists-error"
import { User } from "@prisma/client"
import { _bcrypt } from "@/lib/bcrypt"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({name, email, password}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const password_hash = await _bcrypt.hash(password, 6)  //o valor mais utilizado são de 6 rounds

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user
        }
    }
}