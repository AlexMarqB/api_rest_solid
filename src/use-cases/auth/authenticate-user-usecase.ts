import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error";
import { _bcrypt } from "@/lib/bcrypt";
import { User } from "@prisma/client";

export interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

export interface AuthenticateUseCaseResponse {
    user: User;
}


export class AuthenticateUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        // buscar o usuário no banco de dados pelo email
        // comparar se a senha salva no banco é igual a senha passada

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        // Boolean => "is" "has" "does"

        const doesPasswordMatch = await _bcrypt.compare(password, user.password_hash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return {
            user
        }
    }
}