import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error";
import { _bcrypt } from "@/lib/bcrypt";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string;
}

export interface GetUserProfileUseCaseResponse {
    user: User;
}

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        // buscar o usuário no banco de dados pelo email
        // comparar se a senha salva no banco é igual a senha passada

        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user
        }
    }
}